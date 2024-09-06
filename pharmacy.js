export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      switch (drug.name) {
        case "Herbal Tea":
          this.updateHerbalTea(drug);
          break;
        case "Fervex":
          this.updateFervex(drug);
          break;
        case "Magic Pill":
          this.updateMagicPill(drug);
          break;
        case "Dafalgan":
          this.updateDafalgan(drug);
          break;
        default:
          this.updateNormalDrug(drug);
      }

      // Decrease expiration for all drugs except Magic Pill
      if (drug.name !== "Magic Pill") {
        drug.expiresIn -= 1;
      }
    });

    return this.drugs;
  }

  // Updates for normal drugs
  updateNormalDrug(drug) {
    if (drug.benefit > 0) {
      drug.benefit -= 1;
    }

    if (drug.expiresIn <= 0 && drug.benefit > 0) {
      drug.benefit -= 1;
    }
  }

  // Updates for Herbal Tea
  updateHerbalTea(drug) {
    if (drug.benefit < 50) {
      drug.benefit += 1;
    }

    if (drug.expiresIn <= 0 && drug.benefit < 50) {
      drug.benefit += 1;
    }
  }

  // Updates for Fervex
  updateFervex(drug) {
    if (drug.expiresIn > 10) {
      drug.benefit = Math.min(drug.benefit + 1, 50);
    } else if (drug.expiresIn > 5) {
      drug.benefit = Math.min(drug.benefit + 2, 50);
    } else if (drug.expiresIn > 0) {
      drug.benefit = Math.min(drug.benefit + 3, 50);
    } else {
      drug.benefit = 0;
    }
  }

  // Updates for Magic Pill
  updateMagicPill(drug) {
    // Magic Pill does not change
  }

  // Updates for Dafalgan
  updateDafalgan(drug) {
    if (drug.benefit > 0) {
      drug.benefit -= 2;
    }

    if (drug.expiresIn <= 0 && drug.benefit > 0) {
      drug.benefit -= 2;
    }

    if (drug.benefit < 0) {
      drug.benefit = 0;
    }
  }
}
