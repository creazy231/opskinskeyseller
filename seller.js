var seller = {
	checkSaleForm: function() {
		return ($("#shopSellItemForm").length == 1 && $(".queueContainer").length == 1);
	},

	sellAllBtn: function() {
		// save all current settings
		var shopSellAmt = parseFloat($("#shopSellAmt").val());

		if (isNaN(shopSellAmt) || shopSellAmt <= 0.0) {
			$('#helperStats').html('<div class="alert alert-danger"><strong>OPSkins Quick Key Seller:</strong> <br>Please input the sale price for your item first!</div>');
			return;
		}
		var lastvalue = document.getElementById('shopSellAmt').value;
		chrome.storage.local.set({'keyvalue': lastvalue}, function() {
          // Notify that we saved.
          console.log("Setting saved!("+lastvalue+")");
        });
		var keyType_radio = $("input[name='keyType']:checked").val();
		var items = "";
		switch(keyType_radio) {
			case "gamma":
			    items = $(".pg-item[data-name=\"Gamma Case Key\"]").slice(0, 20);
			    break;
			case "chroma3":
			    items = $(".pg-item[data-name=\"Chroma 3 Case Key\"]").slice(0, 20);
			    break;
			case "chroma2":
			    items = $(".pg-item[data-name=\"Chroma 2 Case Key\"]").slice(0, 20);
			    break;
			case "chroma":
			    items = $(".pg-item[data-name=\"Chroma Case Key\"]").slice(0, 20);
			    break;
			case "casekey":
			    items = $(".pg-item[data-name=\"CS:GO Case Key\"]").slice(0, 20);
			    break;
			case "falchion":
			    items = $(".pg-item[data-name=\"Falchion Case Key\"]").slice(0, 20);
			    break;
			case "revolver":
			    items = $(".pg-item[data-name=\"Revolver Case Key\"]").slice(0, 20);
			    break;
			case "shadow":
			    items = $(".pg-item[data-name=\"Shadow Case Key\"]").slice(0, 20);
			    break;
			case "huntsman":
			    items = $(".pg-item[data-name=\"Huntsman Case Key\"]").slice(0, 20);
			    break;
			case "wildfire":
			    items = $(".pg-item[data-name=\"Operation Wildfire Case Key\"]").slice(0, 20);
			    break;
			case "breakout":
			    items = $(".pg-item[data-name=\"Operation Breakout Case Key\"]").slice(0, 20);
			    break;
			case "phoenix":
			    items = $(".pg-item[data-name=\"Operation Phoenix Case Key\"]").slice(0, 20);
			    break;
			case "vanguard":
			    items = $(".pg-item[data-name=\"Operation Vanguard Case Key\"]").slice(0, 20);
			    break;
			case "winter":
			    items = $(".pg-item[data-name=\"Winter Offensive Case Key\"]").slice(0, 20);
			    break;
			case "esports":
			    items = $(".pg-item[data-name=\"eSports Key\"]").slice(0, 20);
			    break;
			default:
				items = $(".pg-item[data-type=\"Base Grade Key\"]").slice(0, 20);

		}

		items.each(function() {
			var uItem = $(this).attr("id").substring(8);
			$("#uItem").val(uItem);
			$("#shopSellAmt").val(shopSellAmt);

			$("#sellBtn").click();
			$(this).remove();
		});

		if (items.length <= 0) {
			$('#helperStats').html('<div class="alert alert-danger"><strong>OPSkins Quick Key Seller:</strong> <br>No items were added! <strong>Possible reason:</strong><br> You do not have selected tradable key(s) in your inventory.</div>');
		} else {
			$('#helperStats').html('<div class="alert alert-success"><strong>OPSkins Quick Key Seller:</strong> <br>Successfully added ' + items.length + ' key(s) into queue.</div>');
			setTimeout(function() {
				var btnDeposit = document.getElementById("depositBtn");
				btnDeposit.click();
			}, 700);
		}


	},

	keyCheck: function() {

		var items = $(".pg-item[data-type=\"Base Grade Key\"]");

		items.each(function() {
			var uItem = $(this).attr("id").substring(8);
		});
		$("#keyOwned").html('Total tradable key(s): ' + items.length);
	}
};

$(document).ready(function() {
	if (!seller.checkSaleForm()) {
		return;
	}
	// inject element below place item in queue button
	var btn = $("<span>").addClass("btn").addClass("btn-success")
		.attr("id", "sellAllBtn")
		.text("Place Max Keys & Deposit")
		.click(seller.sellAllBtn);
	var status = $("<div>").attr("id", "helperStats");

	chrome.storage.local.get('keyvalue', function (items) {
		document.getElementById('shopSellAmt').value = items.keyvalue
		console.log("Last stored value is " + items.keyvalue);
		});
	$("#qItems").prepend(status);

	$("#sellBtn").after(btn);
	$("#sellAllBtn").after('<div style="border:1px solid #333;border-radius:2px;overflow:hidden;padding:5px;margin-top:1em;color:white;background:rgba(76, 76, 73, 0.3);" id="keyOwned">Loading inventory...</div>');
	$("#keyOwned").after('<div style="border:1px solid #333;border-radius:2px;overflow:hidden;padding:5px;margin-top:1em;color:white;background:rgba(76, 76, 73, 0.3);" id="keySelector"><strong>Select the key you wanted:<br></strong><form id="keyForm"><br><label><input type="radio" name="keyType" value="gamma"> Gamma Case</label><br><label><input type="radio" name="keyType" value="chroma3"> Chroma 3 Case</label><br><label><input type="radio" name="keyType" value="chroma2"> Chroma 2 Case</label><br><label><input type="radio" name="keyType" value="chroma"> Chroma Case</label><br><label><input type="radio" name="keyType" value="casekey"> CS:GO Case Key</label><br><label><input type="radio" name="keyType" value="falchion"> Falchion Case Key</label><br><label><input type="radio" name="keyType" value="revolver"> Revolver Case Key</label><br><label><input type="radio" name="keyType" value="shadow"> Shadow Case Key</label><br><label><input type="radio" name="keyType" value="huntsman"> Huntsman Case Key</label><br><label><input type="radio" name="keyType" value="wildfire"> Operation Wildfire Case Key</label><br><label><input type="radio" name="keyType" value="breakout"> Operation Breakout Case Key</label><br><label><input type="radio" name="keyType" value="phoenix"> Operation Phoenix Case Key</label><br><label><input type="radio" name="keyType" value="vanguard"> Operation Vanguard Case Key</label><br><label><input type="radio" name="keyType" value="winter"> Winter Offensive Case Key</label><br><label><input type="radio" name="keyType" value="esports"> eSports Key</label><br><label><input type="radio" name="keyType" value="any" checked> Any case key</label></form></div>');
	$("#pOff").change(function() {
		var shopSellAmt = parseFloat($("#shopSellAmt").val());

		if (isNaN(shopSellAmt)) {
			shopSellAmt = 0.0;
		}
		else {
			shopSellAmt *= (1 - (parseFloat($(this).val()) / 100.0));
		}

		$("#shopSellAmt").val(shopSellAmt.toFixed(2));
	});
	setTimeout(function() { seller.keyCheck()
	}, 3000);
});
