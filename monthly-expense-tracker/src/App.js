import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';  


function App() {
  const [monthlyBudget,setMonthlyBudget]=useState(150);
  const [currentBalance, setCurrentBalance] = useState(150);
  const [totalSpent, setTotalSpent] = useState(0);         
  const [purchaseLabel, setPurchaseLabel] = useState(''); 
  const [purchase,setPurchase] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]); 

  const percentageSpent = (totalSpent/monthlyBudget) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    const purchaseAmount=Number(purchase)
  
    if (purchaseAmount <=currentBalance) {
      setPurchaseHistory([...purchaseHistory, {
        amount: purchaseAmount,
        label: purchaseLabel || 'Unlabeled', 
        date: new Date().toLocaleString(),

        remainingBalance: currentBalance - purchaseAmount
      }]);
        setTotalSpent(totalSpent + purchaseAmount);
        setCurrentBalance(currentBalance-purchaseAmount);
        setPurchase('')
        setPurchaseLabel(''); 
    }

  };
  const handleReset = (e) => {
    setPurchase(0);
    setTotalSpent(0);
    setCurrentBalance(150);
    setPurchase('');

  }
    // Log current state values
    console.log('Current State:', {
      totalSpent,
      currentBalance,
      percentageSpent
    });
  return (
    <div>
      <h2>Monthly Budget: ${monthlyBudget}</h2>
      <h3>Remaining: ${currentBalance}</h3>
    <div className="progress mb-3"> 
        <div 
          className="progress-bar bg-success" 
          role="progressbar" 
          style={{ width: `${percentageSpent}%` }} 
          aria-valuenow={totalSpent} 
          aria-valuemin="0" 
          aria-valuemax={monthlyBudget}
        >
          {percentageSpent.toFixed(0)}% 
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="number"
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
            placeholder="Enter purchase amount"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input 
            type="text"
            value={purchaseLabel}
            onChange={(e) => setPurchaseLabel(e.target.value)}
            placeholder="Enter purchase description (e.g., Groceries)"
            className="form-control"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!purchase || Number(purchase) > currentBalance}
        >
          Add Purchase
        </button>
      </form>
      <div>Total Spent: ${totalSpent}</div>
      <table className="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Label</th>
                <th>Remaining Balance</th>
            </tr>
        </thead>
        <tbody>
            {purchaseHistory.map((purchase, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>  
                    <td>${purchase.amount}</td> 
                    <td>{purchase.date}</td>  
                    <td>{purchase.label}</td> 
                    <td>${purchase.remainingBalance}</td>  
                </tr>
            ))}
        </tbody>
    </table>
      <button 
        onClick={handleReset}
        className="btn btn-danger mt-3"
      >
        Reset All Values
      </button>

      
  </div>
  );
}

export default App;
