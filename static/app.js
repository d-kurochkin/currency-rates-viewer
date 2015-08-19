var CurrencySelector = React.createClass({
    getInitialState: function () {
        return {currencies: []};
    },

    componentDidMount: function () {
        var context = this;

        //Load all available currencies from server
        fetch('/list').then(function (response) {
            return response.json();
        }).then(function (data) {
            context.setState(data);
        });
    },

    render: function () {
        var currencies = this.state.currencies;

        return (
            <section id="currency-selector">
                <select placeholder="add">
                    <option selected>Add</option>
                    {currencies.map(function (item) {
                        return <option value="{item}">{item}</option>
                    })}
                </select>
            </section>
        );
    }
});

var CurrencyItem = React.createClass({
    handleClick: function () {
        jupiter("currencyClick").pub(this.props.name)
    },

    render: function () {
        return (
            <li>
                <span>{this.props.name}</span> &nbsp;
                <span>{this.props.ratio}</span> &nbsp;
                <button onClick={this.handleClick}>x</button>
            </li>
        )
    }
});

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <CurrencySelector />

                <ul id="currency-list">
                    <CurrencyItem name="USD" ratio="0.5"/>
                    <CurrencyItem name="KZT" ratio="0.7"/>
                    <CurrencyItem name="UAH" ratio="0.9"/>
                </ul>
            </div>
        );
    }
});

React.render(<Main />, document.getElementById("main"));

jupiter("currencyClick").sub(function (name) {
    console.log('Click on ' + name)
});
