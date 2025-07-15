import { define, WeElement, h } from 'omi';

define('xrp-price', class extends WeElement {
  static css = `
    div {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      text-align: center;
      max-width: 300px;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #0050ff;
      color: white;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 1rem;
    }
  `

  price = '...'

  fetchXRP = async () => {
    try {
      const res = await fetch('https://api.coincap.io/v2/assets/ripple')
      const data = await res.json()
      this.price = `$${parseFloat(data.data.priceUsd).toFixed(4)}`
      this.update()
    } catch (err) {
      this.price = 'Error fetching price'
      this.update()
    }
  }

  render() {
    return (
      <div>
        <h2>XRP Price</h2>
        <p style="font-size: 1.5rem">{this.price}</p>
        <button onClick={this.fetchXRP}>Refresh Price</button>
      </div>
    )
  }
})
