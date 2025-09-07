import { useState } from 'react'
import midnightLogo from '/midnightlogo.png'
import gbcLogo from '/gbclogo.png'
import './App.css'

function App() {
  const [data, setData] = useState([
    { addr: '05953038aed9729ff34ed9a98c59efdd6551917958d9c3cfa3b942a17eb33d6d', balance: 6 },
    { addr: '4b57cf61131c9f28d8b67b931e21b8ae403487c6001d1d86241a7884d63507d4', balance: 9 },
    { addr: 'adbb4a661280eefcb86b90ef4cd6e7f63043552547627715d59fbce11d267067', balance: 15 },
  ]);

  const [formData, setFormData] = useState({
    dropdownSelection: '',
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default browser form submission
    const newData = [...data];

    const addr = formData.dropdownSelection ? formData.dropdownSelection : newData[0].addr;

    var delta = 0;
    if (((Number(formData.field1) == 3) || (Number(formData.field1) == 3) || (Number(formData.field1) == 3))
      && (Number(formData.field2) >= Number(formData.field1))) {
      delta += 1;
    }
    if (Number(formData.field3) > 2) {
      delta += 1;
    }

    var idxToUpdate = -1;
    for (var idx = 0; idx < newData.length; idx++) {
      if (newData[idx].addr == addr) {
        idxToUpdate = idx;
      }
    }
    newData[idxToUpdate].balance += delta;

    newData.sort((a, b) => a.balance - b.balance);
    setData(newData);
    // You can send formData to an API or perform other actions here
  };

  return (
    <>
      <div>
        <img src={gbcLogo} className="logo" alt="GBC logo" />
        <img src={midnightLogo} className="logo" alt="Midnight logo" />
      </div>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>PublicKey</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.addr}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.addr}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dropdown">Player:</label>
          <select
            id="dropdown"
            name="dropdownSelection"
            value={formData.dropdownSelection}
            onChange={handleInputChange}
          >
            {data.map((item) => (
              <option key={item.addr} value={item.addr}>0x{item.addr.slice(0, 4)}...</option>
            ))}
          </select>

          <label htmlFor="field1">Par:</label>
          <input
            type="text"
            id="field1"
            name="field1"
            size={1}
            value={formData.field1}
            onChange={handleInputChange}
          />

          <label htmlFor="field2">Green:</label>
          <input
            type="text"
            id="field2"
            name="field2"
            size={1}
            value={formData.field2}
            onChange={handleInputChange}
          />

          <label htmlFor="field3">Putts:</label>
          <input
            type="text"
            id="field3"
            name="field3"
            size={1}
            value={formData.field3}
            onChange={handleInputChange}
          />

          <label htmlFor="field4">Score:</label>
          <input
            type="text"
            id="field4"
            name="field4"
            size={1}
            value={formData.field4}
            onChange={handleInputChange}
          />

          <button type="submit">Submit</button>

        </form>
      </div>
      <p className="read-the-docs">
        Click <a href="https://dev.to/datadr1ven/token-payout-based-on-private-information-golf-barbecue-coin-gbc-38d5">here</a> to learn more
      </p>
    </>
  )
}

export default App
