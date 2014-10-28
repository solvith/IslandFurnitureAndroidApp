/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
	nfc.addMimeTypeListener("text/isf",function (nfcEvent) {
            var tag = nfcEvent.tag,
                ndefMessage = tag.ndefMessage;

            // dump the raw json of the message
            // note: real code will need to decode
            // the payload from each record
			alert("Welcome to Island Furniture \n NFC Tapping Detected !");
			localStorage.setItem("NFC",nfc.bytesToHexString(nfcEvent.tag.id));
			window.location='shoppingList.html';
            // assuming the first record in the message has 
            // a payload that can be converted to a string.
        },function(){console.log('MIME LISTENER REGISTERED');},function(){alert('failed to register listener');});
		
		

    // Read NDEF formatted NFC Tags
    nfc.addNdefListener (
        function (nfcEvent) {
            var tag = nfcEvent.tag,
                ndefMessage = tag.ndefMessage;
				var mimetype="";
				if (ndefMessage!=undefined){
				if (ndefMessage[0]!=undefined){
				if (ndefMessage[0]['type']!=undefined){
				mimetype=nfc.bytesToString(ndefMessage[0]['type']);
				}
				}
				}
								if (mimetype=="text/isf"){
								alert("NFC: Yes Sir/Mdm ! Adding this right away !");
											localStorage.setItem("NFC",nfc.bytesToHexString(nfcEvent.tag.id));
											window.location='shoppingList.html';

								}

        }, 
        function () { // success callback
        },
        function (error) { // error callback
            alert("Error adding NDEF listener " + JSON.stringify(error));
        }
    );
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
