$(document).ready(function() {
  displayChars();
});
let ironman = {
  id: 0,
  img:
    "<img id='ironman' src='assets/imgs/ironman2.png' alt='Ironman Image' value='0'>",
  health: 100,
  attack: 10
};
let thanos = {
  id: 1,
  img:
    "<img id='thanos' src='assets/imgs/thanos.png' alt='Thanos Image' value='1'>",
  health: 200,
  attack: 20
};
let hulk = {
  id: 2,
  img: "<img id='hulk' src='assets/imgs/hulk.png' alt='Hulk Image' value='2'>",
  health: 300,
  attack: 30
};
let ultron = {
  id: 3,
  img:
    "<img id='ultron' src='assets/imgs/ultron.png' alt='Ultron Image' value='3'>",
  health: 400,
  attack: 40
};

// player stats & enemy stats
let player = {};
let enemy = {};

// battle enemy button function
$("#battle").click(function() {
  if ($("#player").is(":empty")) {
    setTimeout(function() {
      {
        alert("You need a character to battle with");
      }
    }, 200);
  } else if ($("#enemy").is(":empty")) {
    alert("You Haven't chosen anyone to battle");
  } else {
    player.health -= enemy.attack;
    enemy.health -= player.attack;
    player.attack += player.attack;
    $("#playerHealth").html(player.health);
    $("#enemyHealth").html(enemy.health);
    checkForDeath();
  }
});

//displays characters to choose from
function displayChars() {
  $("#chars").append(ironman.img + hulk.img + ultron.img + thanos.img);
  selectChar();
}

// selects your character to fight with
function selectChar() {
  $("#chars img").click(function() {
    if ($(this).attr("value") == ironman.id) {
      player = ironman;
      $("#enemiesToDefeat").html(thanos.img + hulk.img + ultron.img);
    } else if ($(this).attr("value") == thanos.id) {
      player = thanos;
      $("#enemiesToDefeat").html(ironman.img + hulk.img + ultron.img);
    } else if ($(this).attr("value") == hulk.id) {
      player = hulk;
      $("#enemiesToDefeat").html(ironman.img + thanos.img + ultron.img);
    } else if ($(this).attr("value") == ultron.id) {
      player = ultron;
      $("#enemiesToDefeat").html(ironman.img + thanos.img + hulk.img);
    }
    $("#chars").empty();
    $("#player").html(player.img);
    $("#playerHealth").html(player.health);
    $("#selectChar").css("display", "none");
    enemyToBattle();
  });
}

//  Selects an enemy to fight
function enemyToBattle() {
  $("#enemiesToDefeat img").click(function() {
    if ($(this).attr("value") == ironman.id) {
      enemy = ironman;
    }
    if ($(this).attr("value") == thanos.id) {
      enemy = thanos;
    }
    if ($(this).attr("value") == hulk.id) {
      enemy = hulk;
    }
    if ($(this).attr("value") == ultron.id) {
      enemy = ultron;
    }
    this.remove();
    $("#enemy").html(enemy.img);
    $("#enemyHealth").html(enemy.health);
    $("#enemiesToDefeat img").unbind();
  });
}

// checks if anyone died
function checkForDeath() {
  if (player.health <= 0) {
    alert("You Have Died!!!");
    resetGame();
  } else if (enemy.health <= 0) {
    $("#enemy img").remove();
    $("#enemyHealth").html("");
    $("#defeated").append(enemy.img);
    checkAllEnemiesDead();
    enemyToBattle();
  }
}

// checks if all enemies have been defeated
function checkAllEnemiesDead() {
  if ($("#enemiesToDefeat").is(":empty")) {
    alert("You have won");
    resetGame();
  }
}

// Resets game
function resetGame() {
  player = {};
  enemy = {};
  $(
    "#enemiesToDefeat, #player, #enemy, #defeated, #playerHealth, #enemyHealth"
  ).empty();
  $("#selectChar").css("display", "block");
  displayChars();
}
