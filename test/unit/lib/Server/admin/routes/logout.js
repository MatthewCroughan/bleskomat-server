/*
	Copyright (C) 2020 Bleskomat s.r.o.

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

const assert = require('assert');

describe('admin', function() {

	let config, server;
	before(function() {
		config = this.helpers.prepareConfig();
		config.admin.web = true;
		config.admin.password = '$scrypt$1$6$ajRPedLuznRgJNBrLrZAoShksAA=$2sfIQl3MRJnbbVDnWPDqGpTBlW0SFcUdebmr+f08rrs=';// test
		return this.helpers.createServer(config).then(result => {
			server = result;
		});
	});

	after(function() {
		if (server) return server.close({ force: true }).then(() => {
			server = null;
		});
	});

	describe('logged-in', function() {

		let cookie;
		before(function() {
			return this.helpers.request('post', {
				url: `${config.lnurl.url}/admin/login`,
				form: { password: 'test' },
			}).then(result => {
				const { response } = result;
				cookie = response.headers['set-cookie'][0];
				assert.ok(cookie);
			});
		});

		it('GET /admin/logout', function() {
			return this.helpers.request('get', {
				url: `${config.lnurl.url}/admin/logout`,
				headers: { cookie },
			}).then(result => {
				const { response, body } = result;
				assert.strictEqual(response.statusCode, 302);
				assert.strictEqual(body, 'Found. Redirecting to /admin');
				return this.helpers.request('get', {
					url: `${config.lnurl.url}/admin/overview`,
					headers: { cookie },
				}).then(result2 => {
					const response2 = result2.response;
					const body2 = result2.body;
					assert.strictEqual(response2.statusCode, 302);
					assert.strictEqual(body2, 'Found. Redirecting to /admin/login');
				});
			});
		});
	});
});
