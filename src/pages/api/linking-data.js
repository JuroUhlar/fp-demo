export default async function submit(req, res) {
  const { requestId, visitorId, accountId } = req.body;
  if (!areIDsValid(requestId, visitorId)) {
    res.status(400).send('Something went wrong.');
    return;
  }
  saveToAccountsDatabaseTable({visitorId, accountId})
  res.status(200).send('visitorId and accountId link saved to database');
}

const areIDsValid = (requestId, visitorId) => {
  return true;
}
function saveToAccountsDatabaseTable(arg0) {
    console.log("Saved to db.")
}

