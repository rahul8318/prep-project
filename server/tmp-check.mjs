import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/interviewhub");
  const total = await mongoose.connection.db.collection("questions").countDocuments();
  const js = await mongoose.connection.db.collection("questions").countDocuments({ category: "JavaScript" });
  const react = await mongoose.connection.db.collection("questions").countDocuments({ category: "React" });
  const ts = await mongoose.connection.db.collection("questions").countDocuments({ category: "TypeScript" });
  const html = await mongoose.connection.db.collection("questions").countDocuments({ category: "HTML" });
  const css = await mongoose.connection.db.collection("questions").countDocuments({ category: "CSS" });
  const dsa = await mongoose.connection.db.collection("questions").countDocuments({ category: "DSA" });
  const dbms = await mongoose.connection.db.collection("questions").countDocuments({ category: "DBMS" });
  const networks = await mongoose.connection.db.collection("questions").countDocuments({ category: "Computer Networks" });
  const os = await mongoose.connection.db.collection("questions").countDocuments({ category: "Operating Systems" });
  const hr = await mongoose.connection.db.collection("questions").countDocuments({ category: "HR" });
  console.log(`Total: ${total}`);
  console.log(`JavaScript: ${js}`);
  console.log(`React: ${react}`);
  console.log(`TypeScript: ${ts}`);
  console.log(`HTML: ${html}`);
  console.log(`CSS: ${css}`);
  console.log(`DSA: ${dsa}`);
  console.log(`DBMS: ${dbms}`);
  console.log(`Computer Networks: ${networks}`);
  console.log(`Operating Systems: ${os}`);
  console.log(`HR: ${hr}`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
