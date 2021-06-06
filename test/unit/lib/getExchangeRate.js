/*
	Copyright (C) 2020 Samotari (Charles Hill, Carlos Garcia Ortiz)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const { expect } = require('chai');
const { getExchangeRate } = require('../../../lib');

describe('getExchangeRate(options)', function() {

	it('can get exchange rate from provider', function() {
		return getExchangeRate({
			from: 'BTC',
			to: 'EUR',
		}).then(result => {
			expect(result).be.a('string');
			const rate = Number(result);
			expect(Number.isNaN(rate)).to.equal(false);
			expect(Number.isFinite(rate)).to.equal(true);
		});
	});
});
