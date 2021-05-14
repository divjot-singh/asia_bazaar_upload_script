const CATEGORIES_MAP = {
  beans_and_lentils: {
    id: "beans_and_lentils",
    name: "Beans and lentils",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/beans_and_lentils.png",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_beans_and_lentils.png",
  },
  beverages: {
    id: "beverages",
    name: "Beverages",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/beverages.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_beverages.jpeg",
  },
  dry_fruits: {
    id: "dry_fruits",
    name: "Dry fruits",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/dry_fruits.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_dry_fruits.jpeg",
  },
  flour_and_rice: {
    id: "flour_and_rice",
    name: "Flour and rice",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/flour_and_rice.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_flour_and_rice.jpeg",
  },
  frozen: {
    id: "frozen",
    name: "Frozen",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/frozen.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_frozen.jpeg",
  },
  grains: {
    id: "grains",
    name: "Grains",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/grains.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_grains.jpeg",
  },
  grocery: {
    id: "grocery",
    name: "Grocery",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/grocery.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_grocery.jpeg",
  },
  health_and_beauty: {
    id: "health_and_beauty",
    name: "Health and beauty",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/health_and_beauty.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_health_and_beauty.jpeg",
  },
  home_goods: {
    id: "home_goods",
    name: "Home goods",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/home_goods.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_home_goods.jpeg",
  },
  oils: {
    id: "oils",
    name: "Oils",
    image_url: "https://substantivedebate.xyz/app_pics/category_pics/oils.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_oils.jpeg",
  },
  organic: {
    id: "organic",
    name: "Organic",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/organic.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_organic.jpeg",
  },
  pickles: {
    id: "pickles",
    name: "Pickles",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/pickles.png",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_pickles.png",
  },
  produce: {
    id: "produce",
    name: "Produce",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/produce.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_produce.jpeg",
  },
  ready_to_eat: {
    id: "ready_to_eat",
    name: "Ready to eat",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/ready_to_eat.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_ready_to_eat.jpeg",
  },
  religious_items: {
    id: "religious_items",
    name: "Religious items",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/religious_items.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_religious_items.jpeg",
  },
  sauces_chutney: {
    id: "sauces_chutney",
    name: "Sauces chutney",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/sauces_chutney.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_sauces_chutney.jpeg",
  },
  snacks: {
    id: "snacks",
    name: "Snacks",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/snacks.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_snacks.jpeg",
  },
  spices: {
    id: "spices",
    name: "Spices",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/spices.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_spices.jpeg",
  },
  sweets: {
    id: "sweets",
    name: "Sweets",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/sweets.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_sweets.jpeg",
  },
  dairy: {
    id: "dairy",
    name: "Dairy",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/dairy.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_dairy.jpeg",
  },
  seasonal: {
    id: "seasonal",
    name: "Seasonal",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/seasonal.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_seasonal.jpeg",
  },
  sea_food: {
    id: "sea_food",
    name: "Sea food",
    image_url:
      "https://substantivedebate.xyz/app_pics/category_pics/sea_food.jpeg",
    thumb_url:
      "https://substantivedebate.xyz/app_pics/category_pics/thumbnails/tn_sea_food.jpeg",
  },
};

const ItemModel = {
  category_id: "",
  cost: "",
  dept_name: "",
  description: "",
  image_url: "",
  item_id: "",
  quantity: 10,
  timestamp: "",
  tokens: [],
  barcodes: [],
};

const TokenizeString = (string) => {
  string = string.toLowerCase().split("'").join("");
  var tokenWords = string.split(" "),
    tokens = [...getAllSubstrings(string)];

  if (tokenWords.length > 1) {
    tokens = [...tokens, ...tokenWords];
    for (var t = 1; t < tokenWords.length; t++) {
      tokens = [...tokens, ...getAllSubstrings(tokenWords[t])];
    }
  }

  return tokens;
};

function getAllSubstrings(str) {
  var allSubstrings = [];
  var start = 2;

  for (var i = start; i <= str.length; i++) {
    allSubstrings.push(str.substring(0, i));
  }
  return allSubstrings;
}

module.exports = {
  CATEGORIES_MAP: CATEGORIES_MAP,
  TokenizeString: TokenizeString,
};
