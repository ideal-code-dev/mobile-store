define([
    'jquery',
    'uiComponent',
    'underscore',
    'Magento_Customer/js/customer-data',
    'jquery/jquery-storageapi'
], function($, Component, _, customerData) {
    'use strict';

    return Component.extend({

        /** @inheritdoc */
        initialize: function() {
            this._super();

            this.cookieMessages = $.cookieStorage.get('mage-messages');
            this.messages = customerData.get('messages').extend({
                disposableCustomerData: 'messages'
            });

            if(!_.isEmpty(this.messages().messages)) {
                customerData.set('messages', {});
            }
            $.cookieStorage.set('mage-messages', '');

            this.messages.subscribe(function() {
                $('.messages').trigger('processStop');
            });
        }
    });
});
