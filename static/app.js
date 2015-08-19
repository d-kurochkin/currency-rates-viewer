var CurrencySelector = React.createClass({
    getInitialState: function () {
        return {value: 'select'}
    },

    change: function (event) {
        var value = event.target.value;

        jupiter('select').pub(value);
        this.setState({value: value});
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
            main: '',
            currencies: [],
            rates: []
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

        return (
            <div>
                <CurrencySelector currencies={currencies}/>

                <ul id="currency-list">
                    {currencies.map(function (item) {
                        return <CurrencyItem name={item} ratio="0"/>
                    })}
                </ul>
            </div>
        );
    }
});

var MainComponentMounted = React.render(<MainComponent />, document.getElementById("main"));

jupiter('select').sub(function (arg) {
    console.log('Selected item ' + arg)
});