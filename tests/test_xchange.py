from unittest import TestCase
import xchange


class TestXchange(TestCase):
    def test_get_pairs_unknown(self):
        self.assertRaises(ValueError, xchange.get_rates, "DS")

    def test_get_pairs_USD(self):
        pairs = ["'USDEUR'", "'USDJPY'", "'USDKZT'", "'USDRUB'", "'USDUAH'"]
        result = xchange._currency_pairs("USD")

        self.assertEqual(pairs, result)

    def test_build_query(self):
        query = "select * from yahoo.finance.xchange where pair in ('USDEUR', 'USDJPY', 'USDKZT', 'USDRUB', 'USDUAH')"

        self.assertEqual(query, xchange._build_query("USD"))

    def test_get_rates_unknown(self):
        self.assertRaises(ValueError, xchange.get_rates, "DS")

    def test_get_rates_keys(self):
        rates = {'USDEUR': '0.9037', 'USDKZT': '188.3950', 'USDUAH': '22.1000',
                 'USDJPY': '124.2890', 'USDRUB': '65.7705'}
        result = xchange.get_rates("USD")

        self.assertEqual(rates.keys(), result.keys())