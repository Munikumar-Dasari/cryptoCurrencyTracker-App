// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CryptocurrenciesList from '../CryptocurrenciesList'

class CryptocurrencyTracker extends Component {
  state = {isLoading: true, cryptocurrenciesData: []}

  componentDidMount() {
    this.getCryptocurrencies()
  }

  getCryptocurrencies = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const formattedData = data.map(eachCryptocurrency => ({
      id: eachCryptocurrency.id,
      currencyLogoUrl: eachCryptocurrency.currency_logo,
      currencyName: eachCryptocurrency.currency_name,
      usdValue: eachCryptocurrency.usd_value,
      euroValue: eachCryptocurrency.euro_value,
    }))

    this.setState({isLoading: false, cryptocurrenciesData: formattedData})
  }

  render() {
    const {isLoading, cryptocurrenciesData} = this.state
    return (
      <div className="app-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <CryptocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />
        )}
      </div>
    )
  }
}

export default CryptocurrencyTracker
