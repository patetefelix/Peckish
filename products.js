/* Peckish — concept catalog. Prices are placeholder concept content. */
window.PECKISH = {
  sauces: [
    {
      slug: "chick", no: "01", name: "Chick", level: 1,
      notes: "Honey butter · sweet paprika", mood: "Zero drama", heatWord: "Mild",
      price: 12, image: "sauce-chick.webp", theme: "yellow",
      tagline: "Sweet. Gentle. Dangerously spreadable.",
      intro: "Honey butter meets sweet paprika in a sauce that never raises its voice. Golden, buttery, and happy on literally everything you own.",
      tastes: "honey / butter / warm paprika",
      flavor: ["Butter first.", "Honey butter leads, sweet paprika follows. It reads more glaze than sauce."],
      heat: ["One out of five.", "Warm, not hot. Built for kids, grandparents and anyone who orders mild on purpose."],
      pairing: ["Breakfast, obviously.", "Honey Butter burgers, waffles, roast chicken and whatever is left in the fridge at 11pm."],
      pairsWith: "Pairs beautifully with Honey Butter burgers, biscuits, fries and people who say they don't like hot sauce."
    },
    {
      slug: "hen", no: "02", name: "Hen", level: 2,
      notes: "Ají amarillo · honey · lime", mood: "A little warm", heatWord: "Medium mild",
      price: 12, image: "sauce-hen.webp", theme: "yellow",
      tagline: "Bright. Fruity. A little bit cheeky.",
      intro: "Peruvian ají amarillo brings sunshine, honey rounds it off and lime keeps it honest. A sauce that wakes things up without starting a fight.",
      tastes: "ají amarillo / honey / lime",
      flavor: ["Fruit forward.", "Ají amarillo is fruity before it is spicy. Honey and lime turn it into something you keep reaching for."],
      heat: ["Two out of five.", "A gentle warmth that builds slowly and leaves politely."],
      pairing: ["Anything green.", "Verde burgers, grilled fish, tacos, avocado toast and salads that deserve better."],
      pairsWith: "Pairs beautifully with Verde burgers, tacos, grilled fish and mild curiosity."
    },
    {
      slug: "rooster", no: "03", name: "Rooster", level: 3,
      notes: "Smoked pineapple · habanero", mood: "Getting loud", heatWord: "Medium hot",
      price: 12, image: "sauce-rooster.webp", theme: "red",
      tagline: "Sweet. Smoky. Loud enough.",
      intro: "Smoked pineapple meets habanero in the sauce that knows how to make an entrance. Tropical up front, a proper kick on the finish.",
      tastes: "pineapple / smoke / heat",
      flavor: ["Sweet first.", "Smoked pineapple gives it a sunny start before habanero makes itself known."],
      heat: ["Three out of five.", "Noticeable heat with plenty of flavor. A happy medium for ambitious snackers."],
      pairing: ["Put it on everything.", "Especially crispy chicken, smoky burgers, golden fries and midnight leftovers."],
      pairsWith: "Pairs beautifully with Smokehouse burgers, fries, grilled veggies and poor impulse control."
    },
    {
      slug: "firebird", no: "04", name: "Firebird", level: 4,
      notes: "Ghost pepper · roasted garlic", mood: "Buckle up", heatWord: "Hot",
      price: 12, image: "sauce-firebird.webp", theme: "red",
      tagline: "Garlic. Ghost pepper. Game on.",
      intro: "Roasted garlic lays the groundwork, ghost pepper kicks the door in. Deep, savory heat for people who mean it.",
      tastes: "roasted garlic / smoke / serious heat",
      flavor: ["Garlic deep.", "Slow-roasted garlic gives it body. Ghost pepper gives it a reputation."],
      heat: ["Four out of five.", "Proper heat that lingers. Have a drink nearby. Have a plan."],
      pairing: ["Fried things.", "Firebird burgers, wings, fried eggs and anything that needs waking up."],
      pairsWith: "Pairs beautifully with Firebird burgers, wings, fried eggs and a glass of milk on standby."
    },
    {
      slug: "last-will", no: "05", name: "Last Will", level: 5,
      notes: "Carolina Reaper · black garlic", mood: "Sign here", heatWord: "Extreme",
      price: 12, image: "sauce-last-will.webp", theme: "black",
      tagline: "Reaper. Black garlic. No refunds.",
      intro: "Carolina Reaper and black garlic in a dark, sticky, deeply serious sauce. Umami rich, slow burning, and absolutely not kidding.",
      tastes: "black garlic / molasses / regret",
      flavor: ["Dark and sweet.", "Black garlic and molasses make it rich and almost savory. Then the Reaper arrives."],
      heat: ["Five out of five.", "This is the top shelf. Start with a drop. Sign the waiver. Tell someone you love them."],
      pairing: ["A few drops.", "Double Stacks, chili, brisket and dares. Never on a first date."],
      pairsWith: "Pairs beautifully with Double Stack burgers, brisket, chili and a signed waiver."
    }
  ],
  burgers: [
    { slug: "classic", no: "01", name: "The Classic", desc: "Crispy thigh, pickles, lettuce, house mayo, brioche.", price: 11, heat: 1, image: "burger-classic.webp", sauce: "chick" },
    { slug: "honey-butter", no: "02", name: "Honey Butter", desc: "Crispy chicken, honey butter glaze, slaw.", price: 12, heat: 1, image: "burger-honey-butter.webp", sauce: "chick" },
    { slug: "double-stack", no: "03", name: "Double Stack", desc: "Two crispy thighs, American cheese, pickles, house sauce.", price: 15, heat: 2, image: "burger-double-stack.webp", sauce: "hen" },
    { slug: "smokehouse", no: "04", name: "Smokehouse", desc: "Smoked pineapple habanero, bacon, cheddar, onion ring.", price: 14, heat: 3, image: "burger-smokehouse.webp", sauce: "rooster" },
    { slug: "verde", no: "05", name: "Verde", desc: "Herb lime sauce, avocado, jalapeño, cabbage slaw.", price: 13, heat: 2, image: "burger-verde.webp", sauce: "hen" },
    { slug: "firebird", no: "06", name: "Firebird", desc: "Ghost garlic sauce, pepper jack, pickled red onion.", price: 14, heat: 4, image: "burger-firebird.webp", sauce: "firebird" },
    { slug: "garden", no: "07", name: "Garden", desc: "Crispy cauliflower or plant based patty, honey butter, slaw.", price: 12, heat: 1, image: "burger-garden.webp", sauce: "chick" }
  ],
  pack: { slug: "full-flock", name: "The Full Flock", price: 54, note: "All five heat levels. One glorious box." }
};
