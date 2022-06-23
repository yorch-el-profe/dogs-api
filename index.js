const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const API = "https://dog.ceo/api";

app.get("/breeds", async function (request, response) {
	try {
		const { data } = await axios.get(`${API}/breeds/list/all`);
		const { message } = data;
		response.json({ data: Object.keys(message) });
	} catch (e) {
		response.status(400).json({ error: e.message });
	}
});

app.get("/breeds/:breed/images", async function (request, response) {
	const { breed } = request.params;
	const { n } = request.query;

	try {
		const { data } = n
			? await axios.get(`${API}/breed/${breed}/images/random/${n}`)
			: await axios.get(`${API}/breed/${breed}/images/random`);
		response.json({ data: data.message });
	} catch (e) {
		response.status(400).json({ error: e.message });
	}
});

app.listen(process.env.PORT || 3000);
