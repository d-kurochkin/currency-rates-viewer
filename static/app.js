var CurrencySelector = React.createClass({
    getInitialState: function () {
        return {value: 'select'}
    },

    change: function (event) {
        var value = event.target.value;
        this.setState({value: value});

        if (value != 'select') {
            PubSub.publish('base:set', value);
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
        var component = this;

        fetch('/list').then(function (response) {
            return response.json();
        }).then(function (data) {
            component.setState(data);
        });

        PubSub.subscribe('rates:update', function (msg, data) {
            if (component.isMounted){
                component.setState(data);
            }
        });
    },

    render: function () {
        var currencies = this.state.currencies;
        var rates = this.state.rates;
        var currentUpdate = this.state.currentUpdate;

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
                    Current update: {moment(currentUpdate).format('MMMM Do YYYY, HH:mm:ss')}
                </div>
            </div>

        );
    }
});

var MainComponentMounted = React.render(<MainComponent />, document.getElementById("main"));

PubSub.subscribe('rates:get', function (msg, currency) {
    fetch('/ratio/' + currency).then(function (response) {
        return response.json();
    }).then(function (data) {
        data.currentUpdate = new Date();

        PubSub.publish('rates:update', data);
    });
});


(function(){
    var baseCurrency;
    var timeout;

    PubSub.subscribe('base:set', function (msg, currency) {
        clearTimeout(timeout);
        baseCurrency = currency;
        PubSub.publish('rates:get', currency);
    });

    PubSub.subscribe('rates:update', function () {
        if (baseCurrency) {
            timeout = setTimeout(function(){
                PubSub.publish('rates:get', baseCurrency);
            }, 10000);
        }
    });
})();
