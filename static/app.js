var CurrencySelector = React.createClass({
    getInitialState: function () {
        return {value: 'select'}
    },

    change: function (event) {
        var value = event.target.value;
        this.setState({value: value});

        if (value != 'select') {
            jupiter('select').pub(value);
        }
    },

    render: function () {
        var currencies = this.props.currencies;

        return (
            <section id="currency-selector">
                <span>Base currency</span>
                <select placeholder="add" value={this.state.value} onChange={this.change}>
                    <option value="select">Select</option>
                    {currencies.map(function (item) {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </section>
        );
    }
});

var CurrencyItem = React.createClass({
    render: function () {
        return (
            <li>
                <span>{this.props.name}</span> &nbsp;
                <span>{this.props.ratio}</span> &nbsp;
            </li>
        )
    }
});

var MainComponent = React.createClass({
    getInitialState: function () {
        return {
            currencies: [],
            rates: {},
            currentUpdate: 'Never'
        }
    },

    componentDidMount: function () {
        //Save context to use setState
        var main = this;

        fetch('/list').then(function (response) {
            return response.json();
        }).then(function (data) {
            main.setState(data);
        });
    },

    render: function () {
        var currencies = this.state.currencies;
        var rates = this.state.rates;

        return (
            <div>
                <CurrencySelector currencies={currencies}/>

                <div>Current update: {this.state.currentUpdate} </div>

                <ul id="currency-list">
                    {Object.keys(rates).map(function (key) {
                        return <CurrencyItem name={key} ratio={rates[key]}/>
                    })}
                </ul>
            </div>
        );
    }
});

var MainComponentMounted = React.render(<MainComponent />, document.getElementById("main"));

function updateRates(currency) {
    fetch('/ratio/' + currency).then(function (response) {
        return response.json();
    }).then(function (data) {
        data.currentUpdate = new Date().toISOString();
        MainComponentMounted.setState(data);
    });
}


var interval;
//@todo Think about request timeouts
jupiter('select').sub(function (currency) {
    updateRates(currency);

    interval = setInterval(function () {
        updateRates(currency);
    }, 10000);
});