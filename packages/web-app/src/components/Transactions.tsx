export default function Transactions() {
  const transactions = [
    { hash: "0x123...", status: "Success", value: "0.1 ETH" },
    { hash: "0x456...", status: "Pending", value: "1.5 ETH" },
    { hash: "0x789...", status: "Failed", value: "0.05 ETH" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
      <ul className="space-y-3">
        {transactions.map((tx, index) => (
          <li key={index} className="flex justify-between">
            <span className="text-sm text-gray-600">{tx.hash}</span>
            <span
              className={`text-sm ${
                tx.status === "Success"
                  ? "text-green-500"
                  : tx.status === "Pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}>
              {tx.status}
            </span>
            <span className="font-bold">{tx.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
