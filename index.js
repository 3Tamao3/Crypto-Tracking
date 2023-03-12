const COINS = ["bitcoin", "ethereum", "cardano", "polkadot", "solana", "cosmos", "avalanche-2"];
const CONTAINER = document.querySelector(".container");

function fetchCoinData() {
  return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(",")}&vs_currencies=usd&include_24hr_change=true`)
    .then(res => res.json())
    .then(json => {
      return Object.entries(json).map(([id, coin]) => {
        return {
          id,
          name: id.toUpperCase(),
          price: coin.usd,
          change: coin.usd_24h_change.toFixed(7),
        };
      });
    });
}

function renderCoins(coins) {
  coins.forEach(coin => {
    const { id, name, price, change } = coin;
    const coinElement = document.createElement("div");
    coinElement.classList.add("coin", change < 0 ? "falling" : "rising");
    coinElement.innerHTML = `
      <div class="coin-logo">
        <img src="images/${id}.png">
      </div>
      <div class="coin-name">
        <h3>${name}</h3>
        <span> /USD </span>
      </div>
      <div class="coin-price">
        <span class="price">${price}</span>
        <span class="change">${change}</span>
      </div>
    `;
    CONTAINER.appendChild(coinElement);
  });
}

fetchCoinData()
  .then(renderCoins)
  .catch(error => console.error(error));
