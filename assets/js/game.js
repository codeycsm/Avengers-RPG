// player stats & enemy stats
let player = {};
let enemy = {};
let baseAttack;
// Characters
let ironman = {
  id: 0,
  img:
    "<img id='ironman' src='assets/imgs/ironman2.png' alt='Ironman Image' value='0'>",
  name: "Ironman",
  health: 200,
  attack: 15
};
let thanos = {
  id: 1,
  img:
    "<img id='thanos' src='assets/imgs/thanos.png' alt='Thanos Image' value='1'>",
  name: "Thanos",
  health: 100,
  attack: 25
};
let hulk = {
  id: 2,
  img: "<img id='hulk' src='assets/imgs/hulk.png' alt='Hulk Image' value='2'>",
  name: "Hulk",
  health: 150,
  attack: 20
};
let ultron = {
  id: 3,
  img:
    "<img id='ultron' src='assets/imgs/ultron.png' alt='Ultron Image' value='3'>",
  name: "Ultron",
  health: 180,
  attack: 10
};
// battle enemy button function
$("#battle").click(function() {
  if ($("#player").is(":empty")) {
    alert("You need a character to battle with");
  } else if ($("#enemy").is(":empty")) {
    alert("You Haven't chosen anyone to battle");
  } else {
    $("#playerAttackText").html(
      "You attacked " + enemy.name + " for " + player.attack + " damage."
    );
    $("#enemyAttackText").html(
      enemy.name + " attacked you for " + enemy.attack + " damage."
    );
    player.health -= enemy.attack;
    enemy.health -= player.attack;
    player.attack += baseAttack;
    $("#playerHealth").html("Health: " + player.health);
    $("#playerAttack").html("Attack: " + player.attack);
    $("#enemyHealth").html("Health: " + enemy.health);
    $("#enemyAttack").html("Attack: " + enemy.attack);
    checkForDeath();
  }
});
//displays characters to choose from
function displayChars() {
  $("#enemies, #battleContainer, #button, #defeatedContainer").hide();
  $("#chars").html(ironman.img + hulk.img + ultron.img + thanos.img);
  selectChar();
}
// selects your character to fight with
function selectChar() {
  $("#chars img").click(function() {
    $("#enemies, #battleContainer,#defeatedContainer").show();
    if ($(this).attr("value") == ironman.id) {
      console.log(this);
      player = jQuery.extend({}, ironman);
      $("#enemiesToDefeat").html(thanos.img + hulk.img + ultron.img);
    } else if ($(this).attr("value") == thanos.id) {
      player = jQuery.extend({}, thanos);
      $("#enemiesToDefeat").html(ironman.img + hulk.img + ultron.img);
    } else if ($(this).attr("value") == hulk.id) {
      player = jQuery.extend({}, hulk);
      $("#enemiesToDefeat").html(ironman.img + thanos.img + ultron.img);
    } else if ($(this).attr("value") == ultron.id) {
      player = jQuery.extend({}, ultron);
      $("#enemiesToDefeat").html(ironman.img + thanos.img + hulk.img);
    }
    baseAttack = player.attack;
    $("#chars").empty();
    $("#player").html(this);
    $("#playerHealth").html("Health: " + player.health);
    $("#playerAttack").html("Attack: " + player.attack);
    $("#selectChar").css("display", "none");
    enemyToBattle();
  });
}
//  Selects an enemy to fight
function enemyToBattle() {
  $("#enemiesToDefeat img").click(function() {
    if ($(this).attr("value") == ironman.id) {
      enemy = jQuery.extend({}, ironman);
    } else if ($(this).attr("value") == thanos.id) {
      enemy = jQuery.extend({}, thanos);
    } else if ($(this).attr("value") == hulk.id) {
      enemy = jQuery.extend({}, hulk);
    } else if ($(this).attr("value") == ultron.id) {
      enemy = jQuery.extend({}, ultron);
    }
    if (player.name !== {} && enemy.name !== {}) {
      $("#button").show();
    }
    this.remove();
    $("#enemy").html(this);
    $("#enemyHealth").html("Health: " + enemy.health);
    $("#enemyAttack").html("Attack: " + enemy.attack);
    $("#enemiesToDefeat img").unbind();
  });
}
// checks if anyone died
function checkForDeath() {
  if (player.health <= 0 && enemy.health <= 0) {
    $("#playerAttackText").empty();
    $("#enemyAttackText").empty();
    $("#enemyHealth").empty();
    $("#playerHealth").empty();
    $("#enemyAttack").empty();
    $("#playerAttack").empty();
    $("#player").empty();
    $("#enemy").empty();
    setTimeout(function() {
      alert("No one survived this War!");
      resetGame();
    }, 300);
  } else if (player.health <= 0) {
    $("#player").empty();
    $("#playerHealth").empty();
    $("#enemyAttack").empty();
    $("#playerAttackText").empty();
    setTimeout(function() {
      alert("You Have Died!!!");
      resetGame();
    }, 300);
  } else if (enemy.health <= 0) {
    $("#button").hide();
    $("#enemyAttackText").empty();
    $("#playerAttackText").empty();
    $("#enemyAttack").empty();
    $("#enemyHealth").empty();
    $("#enemy").empty();
    $("#defeated").append(enemy.img);
    checkAllEnemiesDead();
    enemyToBattle();
  }
}
// checks if all enemies have been defeated
function checkAllEnemiesDead() {
  if ($("#enemiesToDefeat").is(":empty")) {
    setTimeout(function() {
      alert("You have won");
      resetGame();
    }, 300);
  }
}
// Resets game
function resetGame() {
  player = {};
  enemy = {};
  $(
    "#enemiesToDefeat, #player, #enemy, #defeated, #playerHealth, #enemyHealth, #enemyAttack, #playerAttack, #playerAttackText, #enemyAttackText"
  ).empty();
  $("#selectChar").css("display", "block");
  displayChars();
}
$(document).ready(function() {
  displayChars();
});
