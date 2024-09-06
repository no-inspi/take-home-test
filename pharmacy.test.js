import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  
  it("should decrease the benefit and expiresIn for normal drugs", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("should not decrease benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  });

  it("should decrease benefit twice as fast after expiration", () => {
    expect(new Pharmacy([new Drug("test", 0, 4)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 2)]
    );
  });

  it("should not increase benefit above 50 for Herbal Tea", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 1, 50)]
    );
  });

  it("should increase benefit for Herbal Tea", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 2, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 1, 11)]
    );
  });

  it("should increase benefit twice as fast for Herbal Tea after expiration", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 12)]
    );
  });

  it("should never change benefit or expiresIn for Magic Pill", () => {
    expect(new Pharmacy([new Drug("Magic Pill", 5, 40)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 5, 40)]
    );
  });

  it("should increase benefit by 2 when Fervex has 10 days or less", () => {
    expect(new Pharmacy([new Drug("Fervex", 10, 20)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 9, 22)]
    );
  });

  it("should increase benefit by 3 when Fervex has 5 days or less", () => {
    expect(new Pharmacy([new Drug("Fervex", 5, 20)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 4, 23)]
    );
  });

  it("should drop benefit to 0 when Fervex expires", () => {
    expect(new Pharmacy([new Drug("Fervex", 0, 20)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", -1, 0)]
    );
  });

  // Tests for Dafalgan
  it("should degrade Dafalgan benefit twice as fast before expiration", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 5, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 4, 8)]
    );
  });

  it("should degrade Dafalgan benefit twice as fast after expiration", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 0, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", -1, 6)]
    );
  });

  it("should not reduce Dafalgan benefit below 0", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 5, 1)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 4, 0)]
    );
  });
});
