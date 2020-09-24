const Clarifai = require('clarifai');
const deepai = require('deepai');

deepai.setApiKey('497ee4c4-b0a2-474f-bd4a-2cef4deb4d96');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY_HERE'
});

const handleApiCall = async (req, res) => {
  try {
    let resp = await deepai.callStandardApi("summarization", {
      text: req.body.text,
    });
    console.log(resp)
    res.json({summary: resp.output})
  } catch (error) {
    console.log(error)
  }
}

const handleRequest = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleRequest,
  handleApiCall
}