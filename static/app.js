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
            <section id="currency-selector" className="form-inline">
                <label> Currency ratio viewer </label>
                <select className="form-control pull-right" value={this.state.value} onChange={this.change}>
                    <option value="select">Select currency</option>
                    {currencies.map(function (item) {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </section>
        );
    }
});

var CurrencyItem = React.createClass({
    getBase: function () {
        return this.props.name.slice(0, 3)
    },
    getQuote: function () {
        return this.props.name.slice(3)
    },
    render: function () {
        return (
            <li className="row">
                <span className="col-md-2">{this.getBase()}</span>
                <span className="glyphicon glyphicon-arrow-right col-md-1"></span>
                <span className="col-md-2">{this.getQuote()}</span>
                <span className="label label-default col-md-3">{this.props.ratio}</span>
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
            <div className="panel panel-default currency-panel">
                <div className="panel-heading">
                    <CurrencySelector currencies={currencies}/>
                </div>
                <div className="panel-body">


                    <ul className="currency-list">
                        {Object.keys(rates).map(function (key) {
                            return <CurrencyItem name={key} ratio={rates[key]}/>
                        })}
                    </ul>
                </div>
                <div className="panel-footer">
                    Current update: {this.state.currentUpdate}
                </div>
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