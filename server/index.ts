import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ACTIVE', system: 'BIJLI_CORE_V2', version: '2.0.0' });
});

// Profile - Find or Create by Wallet Address
app.post('/api/profile', async (req, res) => {
    const { walletAddress, name } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'walletAddress is required' });
    }

    try {
        let user = await prisma.user.findUnique({
            where: { walletAddress },
            include: { profile: true }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    walletAddress,
                    profile: {
                        create: {
                            name: name || `Node_${walletAddress.slice(0, 6)}`,
                            role: 'CONSUMER',
                            reputation: 50
                        }
                    }
                },
                include: { profile: true }
            });
        }

        res.json(user.profile);
    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ error: 'Failed to sync profile' });
    }
});

// Get Stats (Global or Per Profile)
app.get('/api/stats/:profileId?', async (req, res) => {
    // Mocking stats for now, in a real app these would be aggregated from the DB
    const stats = {
        totalEnergy: '1.2 GW/h',
        marketIndex: '+12.5%',
        carbonCredits: '450 Tons',
        gridStability: 'optimal [99.9%]'
    };
    res.json(stats);
});

// Energy Assets
app.get('/api/assets/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
        const assets = await prisma.energyAsset.findMany({
            where: { profileId }
        });
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
});

app.listen(PORT, () => {
    console.log(`[BIJLI_SERVER] Running on port ${PORT}`);
});

export default app;
