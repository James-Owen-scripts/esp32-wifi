const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const corsObj = {
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true,
};

async function getHumAndTemp() {
    let data = {};
    await axios.get('http://192.168.1.64/status')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            data = error;
        });

    return data;
}

// express code
app.use(cors(corsObj));
app.use(express.json());

app.get('/status', async (_req, res) => {
    try {
        res.json(await getHumAndTemp());
    } catch (err) {
        next(err);
    }
});


app.use((_req, res, _next) => {
    res.status(404).json({err: 'Route not found'});
});

app.use((err, _req, res, _next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
