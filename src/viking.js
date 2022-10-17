// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  attack() {
    return this.strength;
  }
  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }
  receiveDamage(damage) {
    // this.health -= damage;
    super.receiveDamage(damage);
    if (this.health > 0) {
      return this.name + " has received " + damage + " points of damage";
    }
    return this.name + " has died in act of combat";
  }
  battleCry() {
    return "Odin Owns You All!";
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return "A Saxon has received " + damage + " points of damage";
    }
    return "A Saxon has died in combat";
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }
  addViking(viking) {
    this.vikingArmy.push(viking);
  }
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }
  genericAttack(attackant, defender) {
    let attackIndex = Math.floor(Math.random() * attackant.length);
    let defenderIndex = Math.floor(Math.random() * defender.length);
    let resultOfAttack = defender[defenderIndex].receiveDamage(
      attackant[attackIndex].strength
    );
    if (resultOfAttack.search("died") !== -1) {
      defender.splice(defenderIndex);
    }
    // defender.forEach((element) => {
    //   if (defEl.health <= 0) {
    //     delete defender[element];
    //   }
    // });

    // this.defender = defender.filter((defEl) => {
    //     return defEl.health > 0;
    // });

    // console.log(defender);
    return resultOfAttack;
  }
  vikingAttack() {
    return this.genericAttack(this.vikingArmy, this.saxonArmy);
  }
  saxonAttack() {
    return this.genericAttack(this.saxonArmy, this.vikingArmy);
  }
  /*vikingAttack() {
    let vikIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let saxIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let resultOfAttack = this.saxonArmy[saxIndex].receiveDamage(
      this.vikingArmy[vikIndex].strength
    );
    this.saxonArmy = this.saxonArmy.filter((saxonEl) => {
      return saxonEl.health > 0;
    });
    return resultOfAttack;
  }
  saxonAttack() {
    let vikIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let saxIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let resultOfAttack = this.vikingArmy[vikIndex].receiveDamage(
      this.saxonArmy[saxIndex].strength
    );
    this.vikingArmy = this.vikingArmy.filter((vikEl) => {
      return vikEl.health > 0;
    });
    return resultOfAttack;
  }*/
  showStatus() {
    if (!this.saxonArmy.length) {
      return "Vikings have won the war of the century!";
    }
    if (!this.vikingArmy.length) {
      return "Saxons have fought for their lives and survived another day...";
    }
    return "Vikings and Saxons are still in the thick of battle.";
  }
}

let viking, saxon, war;

function generateViking() {
  const name = "Harald";
  const strength = 150;
  const health = 300;
  return new Viking(name, health, strength);
}

function generateSaxon() {
  const health = 60;
  const strength = 25;
  return new Saxon(health, strength);
}

viking = generateViking();
saxon = generateSaxon();
war = new War();

war.addViking(viking);
war.addSaxon(saxon);
console.log(war.vikingArmy);

for (let i = 0; i < 12; i++) {
  war.saxonAttack();
  //   console.log(war.vikingArmy.length);
}
console.log(war.vikingArmy);
