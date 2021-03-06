/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const SingleQueryHandler = require('fabric-network/lib/impl/query/singlequeryhandler');
const RoundRobinQueryHandler = require('fabric-network/lib/impl/query/roundrobinqueryhandler');

function getOrganizationPeers(network) {
	return network.channel.getEndorsers(network.mspid);
}

function MSPID_SCOPE_SINGLE(network) {
	const peers = getOrganizationPeers(network);
	return new SingleQueryHandler(peers);
}

function MSPID_SCOPE_ROUND_ROBIN(network) {
	const peers = getOrganizationPeers(network);
	return new RoundRobinQueryHandler(peers);
}

/**
 * @typedef QueryHandlerStrategies
 * @memberof module:fabric-network
 * @property {function} MSPID_SCOPE_SINGLE Query any one of the event services for the connected organisation. Continue
 * to use the same event service for all queries unless it fails.
 * @property {function} MSPID_SCOPE_ROUND_ROBIN Query any one of the event services for the connected organisation.
 * Use the next available peer for each successive query.
 */

module.exports = {
	MSPID_SCOPE_SINGLE,
	MSPID_SCOPE_ROUND_ROBIN
};
