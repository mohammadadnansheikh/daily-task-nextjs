import connectMongo from "../../mongoDB/connDB";
import Todos from "../../model/todoSchema";

export default async function handler(req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed" }));

  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({
        error: "Dont have form data",
      });
    }
    res.status(200).json({
        message : "todo added"
    })
  } else {
    res.status(500).json({
      message: "HTTP method not valid",
    });
  }
}
