function Card(suit,value){
	var cardsuit = suit;
	var cardvalue = value;
	this.getNumber = function(){
		return cardvalue;
	};
	this.getSuit = function(){
		return cardsuit;
	};
	this.getValue = function(){
		if (cardvalue === 11 ||cardvalue === 12||cardvalue === 13){
			return 10;
		}
		else if (cardvalue === 1){
			return 11;
		}
		else {
			return cardvalue;
		}
	};
}
//Deal function
var deal = function(){
	var suitnum = Math.floor(Math.random()*4+1);
	var valuenum = Math.floor(Math.random()*13+1);
	var new_card = new Card(suitnum,valuenum);
	return new_card;
};

//Hand constructor
function Hand(){
	var hand = [deal(),deal()];
	
	this.getHand = function(){
		return hand;
	};
	//Score calculation method
	this.score = function(){
		var score = 0;
		var tempHand = [];
		for (var i in hand){
			tempHand.push(hand[i].getValue());
			score += hand[i].getValue();
		}
		i = 0;
		while(score>21 && tempHand.length>i){
			if (tempHand[i]===11){
				score -=10;
			}
			
			i++;
		}
		return score;
	};
	//hitMe function
	this.hitMe = function(){
		hand.push(deal());
	};
	//Print hand method **Note: Re-write for n number of cards,
	//currently, it only works for 2.
	this.printHand = function(){
		//Assign initial suit and value for the cards
		//var suit = [hard[0].getSuit(),hand[1].getSuit()];
		//var value = [hard[0].getValue(),hand[1].getValue()];
		var tempHand = [];
		
		//Assign Suits depending on suit values
		for (var i in hand){
		
			var card = [];
			if (hand[i].getSuit() === 1){
				card[0] = "Hearts";
			}
			else if (hand[i].getSuit() ===2){
				card[0] = "Diamonds";
			}
			else if (hand[i].getSuit() ===3){
				card[0] = "Clubs";
			}
			else if (hand[i].getSuit() ===4){
				card[0] = "Spades";
			}
		//Assign string values and face values 
			if (hand[i].getNumber() === 1){
				card[1] = "Ace";
			}
			else if (hand[i].getNumber()  === 11){
				card[1] = "Jack";
			}
			else if (hand[i].getNumber()  === 12){
				card[1] = "Queen";
			}
			else if (hand[i].getNumber()  ===13){
				card[1] = "King";
			}
			else{
				card[1] = hand[i].getNumber();
				card[1] = card[1].toString();
			}
			tempHand.push(card);
			
			
		}	
	
		//Create cardprint string of hand
		var cardPrint = "";
		for (var i in tempHand){
			cardPrint += tempHand[i][1]+" of "+tempHand[i][0]+", ";
		}
		//remove the last comma
		cardPrint = cardPrint.substring(0,cardPrint.length-2);
		return cardPrint;
	};
}

var playAsDealer = function(){
	var dealerhand = new Hand();
	while (dealerhand.score()<17){
		dealerhand.hitMe();
	}
	return dealerhand;
};

var playAsUser = function(){
	var userhand = new Hand();
	var decision = true;
	var tempscore = 0;
	
	while (decision){
		tempscore = userhand.score();
		tempscore = tempscore.toString();
		
		decision = confirm("You currently hold "+
		userhand.printHand()+" for a score of "+tempscore+
		", do you want another card?");
		if (decision){
			userhand.hitMe();
		}
		else{
			return userhand;
		}
	}
	
};

var declareWinner = function(userHand,dealerHand){
	if (userHand.score()>21&&dealerHand.score()>21){
		return "You tied!";
	}
	else if(userHand.score()>21){
		return "You lose!";
	}
	else if (dealerHand.score()>21){
		return "You win!";
	}
	else if (userHand.score()===dealerHand.score()){
		return "You tied!";
	}
	else if (userHand.score()<dealerHand.score()){
		return "You lose!";
	}
	else{
		return "You win!";
	}
};

var playGame = function(){
	var player = playAsUser();
	var dealer = playAsDealer();
	
	playerscore = player.score();
	playerscore = playerscore.toString();
	
	dealerscore = dealer.score();
	dealerscore = dealerscore.toString();
	
	console.log("Player's hand: "+
		player.printHand()+", for a score of "+playerscore);
		
	console.log("Dealer's hand: "+
		dealer.printHand()+" for a score of "+dealerscore);
	console.log(declareWinner(player,dealer));
};

playGame();




