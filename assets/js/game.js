$(document).ready(function() {
  let ironman = {
    id: 0,
    img:
      "<img id='ironman' src='assets/imgs/ironman.jpg' alt='Ironman Image' value='0'>",
    health: 100,
    attack: 10
  };
  let thanos = {
    id: 1,
    img:
      "<img id='thanos' src='assets/imgs/thanos.jpg' alt='Thanos Image' value='1'>",
    health: 200,
    attack: 20
  };
  let lokey = {
    id: 2,
    img:
      "<img id='lokey' src='assets/imgs/lokey.jpeg' alt='Lokey Image' value='2'>",
    health: 300,
    attack: 30
  };
  let ultron = {
    id: 3,
    img:
      "<img id='ultron' src='assets/imgs/ultron.jpeg' alt='Ultron Image' value='3'>",
    health: 400,
    attack: 40
  };
  // player stats & enemy stats
  let player = {};
  let enemy = {};

  displayChars();

  //displays characters to choose from
  function displayChars() {
    $("#chars").html(ironman.img + thanos.img + lokey.img + ultron.img);
    selectChar();
  }
  // selects your character to fight with
  function selectChar() {
    $("#chars img").click(function() {
      $("#selectChar").remove();
      if ($(this).attr("value") == ironman.id) {
        player = ironman;
        $("#chars").empty();
        $("#player").html(this);
        $("#playerHealth").html(player.health);
        $("#enemiesToDefeat").html(thanos.img + lokey.img + ultron.img);
        $(this).css("border-color", "green");
        $("#enemiesToDefeat img").css("border-color", "red");
        enemyToBattle();
      }
      if ($(this).attr("value") == thanos.id) {
        player = thanos;
        $("#chars").empty();
        $("#player").html(this);
        $("#playerHealth").html(player.health);
        $("#enemiesToDefeat").html(ironman.img + lokey.img + ultron.img);
        $(this).css("border-color", "green");
        $("#enemiesToDefeat img").css("border-color", "red");
        enemyToBattle();
      }
      if ($(this).attr("value") == lokey.id) {
        player = lokey;
        $("#chars").empty();
        $("#player").html(this);
        $("#playerHealth").html(player.health);
        $("#enemiesToDefeat").html(ironman.img + thanos.img + ultron.img);
        $(this).css("border-color", "green");
        $("#enemiesToDefeat img").css("border-color", "red");
        enemyToBattle();
      }
      if ($(this).attr("value") == ultron.id) {
        player = ultron;
        $("#chars").empty();
        $("#player").html(this);
        $("#playerHealth").html(player.health);
        $("#enemiesToDefeat").html(ironman.img + thanos.img + lokey.img);
        $("#enemiesToDefeat img").css("border-color", "red");
        $(this).css("border-color", "green");
        enemyToBattle();
      }
    });
  }
  //  Selects an enemy to fight
  function enemyToBattle() {
    $("#enemiesToDefeat img").click(function() {
      if ($(this).attr("value") == ironman.id) {
        enemy = ironman;
        $("#enemyHealth").html(enemy.health);
      }
      if ($(this).attr("value") == thanos.id) {
        enemy = thanos;
        $("#enemyHealth").html(enemy.health);
      }
      if ($(this).attr("value") == lokey.id) {
        enemy = lokey;
        $("#enemyHealth").html(enemy.health);
      }
      if ($(this).attr("value") == ultron.id) {
        enemy = ultron;
        $("#enemyHealth").html(enemy.health);
      }
      this.remove();
      $("#enemy").html(this);
      $("#enemiesToDefeat img").unbind();
    });
  }
  // battle enemy button function
  $("#battle").click(function() {
    if ($("#enemy").is(":empty")) {
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
});
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
  $("#enemiesToDefeat").remove();
  $("#user").remove();
  $("#enemy").remove();
  $("#defeated").remove();
  $("#chars").html(ironman.img + thanos.img + lokey.img + ultron.img);
  displayChars();
}
