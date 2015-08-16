var CurrencySelector = React.createClass({
    render: function() {
        return (
            <section id="currency-selector">
                <select placeholder="add">
                    <option selected>Add</option>
                    <option value="USD">USD</option>
                    <option value="BMD">BMD</option>
                    <option value="SZL">SZL</option>
                </select>
            </section>
        );
    }
});

var CurrencyItem = React.createClass({
    render: function() {
        return (
            <li>
                <span>{this.props.name}</span> &nbsp;
                <span>{this.props.ratio}</span> &nbsp;
                <button>x</button>
            </li>
        )
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <CurrencySelector />

                <ul id="currency-list">
                    <CurrencyItem name="USD" ratio="0.5"/>
                    <CurrencyItem name="BMD" ratio="0.7"/>
                    <CurrencyItem name="SZL" ratio="0.9"/>
                </ul>
            </div>
        );
    }
});

React.render(<Main />,
             document.getElementById("main"));
