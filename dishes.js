// Auto-extracted from the SmartPlate AI front end (smartplate-ai.html).
// Keep this in sync if you add or edit dishes on the front end.
const DISHES = [
  {
    "id": "jollof",
    "country": "Nigeria",
    "name": "Jollof Rice & Chicken",
    "region": "African",
    "tag": "Smoky, hearty, festive",
    "time": "60 min",
    "level": "Medium",
    "tint": "#F5D9C0",
    "flag": "linear-gradient(90deg,#008751 33%,#fff 33% 67%,#008751 67%)",
    "ing": [
      "Long-grain rice 500g",
      "Tomatoes 6",
      "Red bell peppers 3",
      "Scotch bonnet pepper 1",
      "Chicken thighs 8",
      "Onion 2",
      "Thyme 1 tsp"
    ],
    "steps": [
      "Blend the tomatoes, peppers and one onion into a smooth base.",
      "Season and fry the chicken until browned, then set aside.",
      "Fry the remaining onion in the chicken fat, add the blended base and cook down until thick.",
      "Stir in the rice, thyme and stock, cover and simmer until the rice is tender.",
      "Nestle the chicken back in to finish, then rest for 10 minutes before serving."
    ]
  },
  {
    "id": "egusi",
    "country": "Nigeria",
    "name": "Egusi Soup",
    "region": "African",
    "tag": "Nutty, rich, filling",
    "time": "70 min",
    "level": "Medium",
    "tint": "#E7D9A8",
    "flag": "linear-gradient(90deg,#008751 33%,#fff 33% 67%,#008751 67%)",
    "ing": [
      "Ground melon seeds 2 cups",
      "Palm oil 1/2 cup",
      "Spinach 2 bunches",
      "Beef 500g",
      "Stockfish 1 piece",
      "Onion 1",
      "Crayfish 2 tbsp"
    ],
    "steps": [
      "Simmer the beef and stockfish in seasoned water until tender.",
      "Heat the palm oil and fry the onion until soft.",
      "Stir in the ground melon seeds in spoonfuls, forming small lumps as they fry.",
      "Add the meat stock and crayfish, and simmer until thickened.",
      "Fold in the spinach and cook for a final five minutes."
    ]
  },
  {
    "id": "wat",
    "country": "Ethiopia",
    "name": "Doro Wat",
    "region": "African",
    "tag": "Spiced, slow-cooked chicken stew",
    "time": "2 hr",
    "level": "Medium",
    "tint": "#D9938A",
    "flag": "linear-gradient(#078930 33%,#FCDD09 33% 67%,#DA121A 67%)",
    "ing": [
      "Chicken pieces 1.2kg",
      "Red onions 4",
      "Berbere spice 3 tbsp",
      "Niter kibbeh (spiced butter) 4 tbsp",
      "Garlic 4 cloves",
      "Ginger 1 tbsp",
      "Hard-boiled eggs 6"
    ],
    "steps": [
      "Cook the onions slowly with no oil until deeply softened.",
      "Add the niter kibbeh, garlic, ginger and berbere, and fry until fragrant.",
      "Add the chicken and a little water, and simmer until the sauce clings to the meat.",
      "Add the boiled eggs and simmer another 10 minutes.",
      "Serve with injera."
    ]
  },
  {
    "id": "tagine",
    "country": "Morocco",
    "name": "Chicken Tagine with Apricots",
    "region": "African",
    "tag": "Sweet, savory, aromatic",
    "time": "80 min",
    "level": "Medium",
    "tint": "#E9C078",
    "flag": "linear-gradient(#C1272D 0 100%)",
    "ing": [
      "Chicken thighs 8",
      "Dried apricots 1 cup",
      "Onion 2",
      "Ginger 1 tbsp",
      "Cinnamon 1 stick",
      "Saffron pinch",
      "Almonds 1/2 cup toasted"
    ],
    "steps": [
      "Brown the chicken in the tagine or a heavy pot.",
      "Add the onion, ginger, cinnamon and saffron, and cook until fragrant.",
      "Add water to half-cover, cover and simmer gently for an hour.",
      "Stir in the apricots for the last 20 minutes.",
      "Scatter with toasted almonds before serving."
    ]
  },
  {
    "id": "bunnychow",
    "country": "South Africa",
    "name": "Bunny Chow",
    "region": "African",
    "tag": "Curry-filled bread, hearty",
    "time": "55 min",
    "level": "Easy",
    "tint": "#EAC79A",
    "flag": "linear-gradient(#000 0 20%,#FFB612 20% 40%,#007A4D 40% 60%,#fff 60% 80%,#DE3831 80%)",
    "ing": [
      "Bread loaf, quartered",
      "Lamb or bean curry base",
      "Potatoes 2",
      "Curry powder 3 tbsp",
      "Onion 1",
      "Garlic 3 cloves",
      "Tomatoes 2"
    ],
    "steps": [
      "Fry the onion and garlic, then add curry powder and toast briefly.",
      "Add the meat or beans, tomatoes and potatoes with enough water to cover.",
      "Simmer until thick and the potatoes are tender.",
      "Hollow out the bread quarters, keeping the removed bread as a lid.",
      "Fill each bread quarter with curry and serve hot."
    ]
  },
  {
    "id": "piripiri",
    "country": "Mozambique",
    "name": "Peri-Peri Chicken",
    "region": "African",
    "tag": "Fiery, charred, citrusy",
    "time": "50 min",
    "level": "Easy",
    "tint": "#E7B6A6",
    "flag": "linear-gradient(90deg,#009639 0 25%,#000 25% 27%,#FFCC29 27% 52%,#000 52% 54%,#DE2910 54%)",
    "ing": [
      "Chicken, spatchcocked",
      "Bird's eye chilies 6",
      "Garlic 4 cloves",
      "Lemon 2",
      "Paprika 1 tbsp",
      "Olive oil 1/3 cup"
    ],
    "steps": [
      "Blend the chilies, garlic, lemon juice, paprika and oil into a marinade.",
      "Coat the chicken and marinate at least an hour.",
      "Grill or roast, basting with the marinade, until cooked through and charred.",
      "Rest for 5 minutes before carving."
    ]
  },
  {
    "id": "sushi",
    "country": "Japan",
    "name": "Sushi",
    "region": "Asian",
    "tag": "Fresh and healthy",
    "time": "45 min",
    "level": "Medium",
    "tint": "#FBE3E3",
    "flag": "radial-gradient(circle,#BC002D 0 28%,#fff 29%)",
    "ing": [
      "Sushi rice 2 cups",
      "Rice vinegar 4 tbsp",
      "Nori sheets 5",
      "Sushi-grade salmon 200g",
      "Cucumber 1",
      "Soy sauce",
      "Wasabi"
    ],
    "steps": [
      "Cook the rice, then fold through the seasoned vinegar and cool to room temperature.",
      "Lay a nori sheet on a mat and spread a thin layer of rice, leaving a border.",
      "Add salmon and cucumber in a line, then roll tightly using the mat.",
      "Slice with a wet, sharp knife into even pieces.",
      "Serve with soy sauce and wasabi."
    ]
  },
  {
    "id": "padthai",
    "country": "Thailand",
    "name": "Pad Thai",
    "region": "Asian",
    "tag": "Sweet, savory, tangy",
    "time": "30 min",
    "level": "Easy",
    "tint": "#F7DFC0",
    "flag": "linear-gradient(#A51931 0 17%,#F4F5F8 17% 33%,#2D2A4A 33% 67%,#F4F5F8 67% 83%,#A51931 83%)",
    "ing": [
      "Rice noodles 250g",
      "Shrimp 300g",
      "Tamarind paste 2 tbsp",
      "Fish sauce 2 tbsp",
      "Bean sprouts 2 cups",
      "Roasted peanuts 1/3 cup",
      "Lime 1",
      "Garlic 3 cloves"
    ],
    "steps": [
      "Soak the rice noodles until pliable.",
      "Stir-fry the garlic and shrimp in a hot wok until just cooked.",
      "Push aside, scramble an egg, then add the noodles and sauce mixture.",
      "Toss everything together with bean sprouts until the noodles are coated.",
      "Finish with peanuts, lime and extra bean sprouts."
    ]
  },
  {
    "id": "butterchicken",
    "country": "India",
    "name": "Butter Chicken & Naan",
    "region": "Asian",
    "tag": "Creamy, spiced, comforting",
    "time": "50 min",
    "level": "Medium",
    "tint": "#F9DCAE",
    "flag": "radial-gradient(circle,#1A237E 0 9%,transparent 10%),linear-gradient(#FF9933 33%,#fff 33% 67%,#138808 67%)",
    "ing": [
      "Chicken thighs 800g",
      "Butter 60g",
      "Tomato puree 400g",
      "Heavy cream 1/2 cup",
      "Garam masala 2 tsp",
      "Ginger 1 tbsp",
      "Garlic 4 cloves",
      "Naan"
    ],
    "steps": [
      "Marinate the chicken in yogurt and spices, then grill or pan-sear until charred at the edges.",
      "Cook garlic and ginger in butter, add tomato puree and simmer until deep red.",
      "Blend the sauce smooth, then return to the pan with garam masala.",
      "Add the chicken and cream, and simmer until the sauce coats the meat.",
      "Serve with warm naan."
    ]
  },
  {
    "id": "bibimbap",
    "country": "South Korea",
    "name": "Bibimbap",
    "region": "Asian",
    "tag": "Colorful, balanced, savory",
    "time": "45 min",
    "level": "Easy",
    "tint": "#E5ECD0",
    "flag": "radial-gradient(circle,#CD2E3A 0 20%,#0047A0 21% 34%,transparent 35%),#fff",
    "ing": [
      "Short-grain rice 2 cups",
      "Thin-sliced beef 250g",
      "Spinach 1 bunch",
      "Carrots 2",
      "Zucchini 1",
      "Eggs 4",
      "Gochujang 3 tbsp",
      "Sesame oil",
      "Garlic 2 cloves"
    ],
    "steps": [
      "Cook the rice and keep warm.",
      "Blanch the spinach, and separately sauté the carrots and zucchini until just tender.",
      "Marinate and sear the beef with garlic and sesame oil.",
      "Fry an egg per bowl, sunny-side up.",
      "Arrange rice topped with vegetables, beef and egg, with gochujang to mix in."
    ]
  },
  {
    "id": "pho",
    "country": "Vietnam",
    "name": "Beef Pho",
    "region": "Asian",
    "tag": "Fragrant broth, herby, light",
    "time": "2 hr",
    "level": "Medium",
    "tint": "#EAD9C4",
    "flag": "linear-gradient(#DA251D 0 100%)",
    "ing": [
      "Beef bones 1.5kg",
      "Beef sirloin 300g",
      "Star anise 4",
      "Cinnamon stick 1",
      "Ginger 1 knob",
      "Rice noodles 300g",
      "Bean sprouts, herbs, lime"
    ],
    "steps": [
      "Char the ginger and onion, then simmer with the bones and spices for at least two hours.",
      "Strain the broth and season with fish sauce.",
      "Cook the rice noodles and divide into bowls.",
      "Top with thin-sliced raw beef, then ladle over the boiling broth to cook it.",
      "Serve with bean sprouts, herbs and lime."
    ]
  },
  {
    "id": "rendang",
    "country": "Indonesia",
    "name": "Beef Rendang",
    "region": "Asian",
    "tag": "Slow-cooked, coconut, deeply spiced",
    "time": "3 hr",
    "level": "Medium",
    "tint": "#C9A27A",
    "flag": "linear-gradient(#fff 0 50%,#CE1126 50%)",
    "ing": [
      "Beef chuck 1kg",
      "Coconut milk 800ml",
      "Lemongrass 3 stalks",
      "Galangal 1 knob",
      "Shallots 8",
      "Chilies 6",
      "Kaffir lime leaves 5"
    ],
    "steps": [
      "Blend the shallots, chilies, galangal and lemongrass into a paste.",
      "Fry the paste until fragrant, then add the beef and coat well.",
      "Pour in the coconut milk and kaffir lime leaves, and bring to a simmer.",
      "Cook uncovered on low heat, stirring occasionally, until the sauce reduces and darkens.",
      "Continue until the beef is deeply tender and coated in thick sauce."
    ]
  },
  {
    "id": "dumplings",
    "country": "China",
    "name": "Pork Dumplings",
    "region": "Asian",
    "tag": "Juicy, folded, dipped in vinegar",
    "time": "75 min",
    "level": "Medium",
    "tint": "#EADFCB",
    "flag": "linear-gradient(#DE2910 0 100%)",
    "ing": [
      "Ground pork 400g",
      "Napa cabbage 1/2 head",
      "Dumpling wrappers 40",
      "Ginger 1 tbsp",
      "Scallions 4",
      "Soy sauce, sesame oil, vinegar"
    ],
    "steps": [
      "Salt the shredded cabbage, then squeeze out the liquid.",
      "Mix the cabbage with pork, ginger, scallions, soy sauce and sesame oil.",
      "Fill each wrapper, pleat and seal the edges.",
      "Steam or pan-fry with a splash of water until cooked through.",
      "Serve with a vinegar and soy dipping sauce."
    ]
  },
  {
    "id": "carbonara",
    "country": "Italy",
    "name": "Pasta Carbonara",
    "region": "European",
    "tag": "Classic, creamy, rich",
    "time": "25 min",
    "level": "Easy",
    "tint": "#F8EBC3",
    "flag": "linear-gradient(90deg,#009246 33%,#fff 33% 67%,#CE2B37 67%)",
    "ing": [
      "Spaghetti 400g",
      "Guanciale 150g",
      "Egg yolks 4",
      "Pecorino Romano 100g",
      "Black pepper"
    ],
    "steps": [
      "Cook the spaghetti in well-salted water.",
      "Render the guanciale in a pan until crisp.",
      "Whisk the yolks with grated pecorino and plenty of black pepper.",
      "Toss the hot, drained pasta with the guanciale off the heat, then quickly stir in the egg mixture, loosening with pasta water.",
      "Serve immediately with extra pecorino."
    ]
  },
  {
    "id": "coqauvin",
    "country": "France",
    "name": "Coq au Vin",
    "region": "European",
    "tag": "Slow-braised, winey",
    "time": "90 min",
    "level": "Medium",
    "tint": "#EFD9D4",
    "flag": "linear-gradient(90deg,#0055A4 33%,#fff 33% 67%,#EF4135 67%)",
    "ing": [
      "Chicken thighs 8",
      "Red wine 750ml",
      "Bacon lardons 150g",
      "Mushrooms 300g",
      "Pearl onions 200g",
      "Carrots 3",
      "Thyme"
    ],
    "steps": [
      "Brown the chicken and set aside, then render the lardons in the same pot.",
      "Sauté the carrots, pearl onions and mushrooms.",
      "Return the chicken, add the wine and thyme, and bring to a simmer.",
      "Cover and braise gently until the chicken is very tender.",
      "Reduce the sauce if needed before serving."
    ]
  },
  {
    "id": "paella",
    "country": "Spain",
    "name": "Seafood Paella",
    "region": "European",
    "tag": "Saffron rice, coastal, sociable",
    "time": "55 min",
    "level": "Medium",
    "tint": "#EFCB7E",
    "flag": "linear-gradient(#AA151B 0 25%,#F1BF00 25% 75%,#AA151B 75%)",
    "ing": [
      "Bomba or paella rice 2 cups",
      "Shrimp 300g",
      "Mussels 300g",
      "Squid 200g",
      "Saffron pinch",
      "Bell pepper 1",
      "Tomatoes 2"
    ],
    "steps": [
      "Sauté the pepper and tomatoes in a paella pan with olive oil.",
      "Add the rice and saffron, and stir to coat.",
      "Pour in hot stock, spread the rice evenly, and stop stirring.",
      "Nestle in the seafood and simmer until the rice is cooked and a crust forms on the bottom.",
      "Rest for five minutes before serving."
    ]
  },
  {
    "id": "schnitzel",
    "country": "Germany",
    "name": "Pork Schnitzel",
    "region": "European",
    "tag": "Crisp, golden, simple",
    "time": "35 min",
    "level": "Easy",
    "tint": "#EDD9A3",
    "flag": "linear-gradient(#000 0 33%,#DD0000 33% 67%,#FFCE00 67%)",
    "ing": [
      "Pork cutlets 4",
      "Flour 1 cup",
      "Eggs 2",
      "Breadcrumbs 1.5 cups",
      "Lemon 1",
      "Butter for frying"
    ],
    "steps": [
      "Pound the cutlets thin between plastic wrap.",
      "Dredge each in flour, then egg, then breadcrumbs.",
      "Fry in butter until deep golden on both sides.",
      "Drain briefly on paper towels.",
      "Serve with a wedge of lemon."
    ]
  },
  {
    "id": "moussaka",
    "country": "Greece",
    "name": "Moussaka",
    "region": "European",
    "tag": "Layered, baked, comforting",
    "time": "90 min",
    "level": "Medium",
    "tint": "#DCC7A0",
    "flag": "linear-gradient(#0D5EAF 0 100%)",
    "ing": [
      "Eggplant 3",
      "Ground lamb 500g",
      "Tomatoes 400g",
      "Onion 1",
      "Béchamel sauce 2 cups",
      "Cinnamon 1/2 tsp"
    ],
    "steps": [
      "Salt and roast or fry the eggplant slices until soft.",
      "Brown the lamb with onion, tomatoes and cinnamon into a thick ragu.",
      "Layer eggplant and ragu in a baking dish.",
      "Top with béchamel sauce.",
      "Bake until golden and set, then rest before slicing."
    ]
  },
  {
    "id": "fishchips",
    "country": "United Kingdom",
    "name": "Fish and Chips",
    "region": "European",
    "tag": "Crisp batter, flaky fish",
    "time": "45 min",
    "level": "Easy",
    "tint": "#E9D9B8",
    "flag": "linear-gradient(#00247D 0 100%)",
    "ing": [
      "Cod fillets 4",
      "Flour 1.5 cups",
      "Cold sparkling water 1.5 cups",
      "Potatoes 4, cut into chips",
      "Oil for frying",
      "Malt vinegar"
    ],
    "steps": [
      "Cut and fry the potatoes in two stages for crisp chips.",
      "Whisk flour and cold sparkling water into a light batter.",
      "Dip the fish in the batter and fry until golden and crisp.",
      "Drain the fish and chips on a rack.",
      "Serve with malt vinegar and salt."
    ]
  },
  {
    "id": "chowder",
    "country": "United States",
    "name": "New England Clam Chowder",
    "region": "American",
    "tag": "Creamy, briny, comforting",
    "time": "45 min",
    "level": "Easy",
    "tint": "#DFE9EF",
    "flag": "linear-gradient(90deg,#3C3B6E 0 45%,transparent 45%),repeating-linear-gradient(#B22234 0 14.28%,#fff 14.28% 28.56%)",
    "ing": [
      "Clams 500g",
      "Potatoes 3",
      "Bacon lardons 100g",
      "Celery 2 stalks",
      "Onion 1",
      "Heavy cream 1 cup",
      "Thyme"
    ],
    "steps": [
      "Render the bacon, then sauté the onion and celery in the fat.",
      "Add potatoes and clam juice, and simmer until the potatoes are tender.",
      "Add the clams and cream, and warm through gently.",
      "Season and finish with thyme.",
      "Serve hot with crackers or bread."
    ]
  },
  {
    "id": "poutine",
    "country": "Canada",
    "name": "Poutine",
    "region": "American",
    "tag": "Fries, cheese curds, gravy",
    "time": "35 min",
    "level": "Easy",
    "tint": "#E7D8B8",
    "flag": "linear-gradient(90deg,#fff 25%,#FF0000 25% 75%,#fff 75%)",
    "ing": [
      "Russet potatoes 5, cut into fries",
      "Cheese curds 2 cups",
      "Beef gravy 2 cups",
      "Oil for frying"
    ],
    "steps": [
      "Fry the potatoes twice for a crisp exterior and fluffy center.",
      "Warm the gravy until simmering.",
      "Pile the fries on a plate and scatter with cheese curds.",
      "Pour the hot gravy over immediately so the curds begin to soften.",
      "Serve right away."
    ]
  },
  {
    "id": "arepas",
    "country": "Colombia",
    "name": "Cheese Arepas",
    "region": "Latin American",
    "tag": "Griddled corn cakes, cheesy",
    "time": "30 min",
    "level": "Easy",
    "tint": "#EAD9AE",
    "flag": "linear-gradient(#FCD116 0 33%,#003893 33% 67%,#CE1126 67%)",
    "ing": [
      "Pre-cooked cornmeal 2 cups",
      "Warm water 2.5 cups",
      "Salt 1 tsp",
      "Mozzarella or queso fresco 1 cup"
    ],
    "steps": [
      "Mix the cornmeal, water and salt into a soft dough.",
      "Knead in the cheese and rest the dough briefly.",
      "Shape into rounds about 1cm thick.",
      "Cook on a hot griddle until golden on both sides and cooked through.",
      "Serve warm, split and filled if you like."
    ]
  },
  {
    "id": "tacos",
    "country": "Mexico",
    "name": "Tacos al Pastor",
    "region": "Latin American",
    "tag": "Spicy, fresh, flavorful",
    "time": "40 min",
    "level": "Easy",
    "tint": "#E3EFC9",
    "flag": "linear-gradient(90deg,#006847 33%,#fff 33% 67%,#CE1126 67%)",
    "ing": [
      "Corn tortillas 12",
      "Pork shoulder 600g",
      "Dried guajillo chilies 3",
      "Pineapple 1 cup diced",
      "Lime 2",
      "Cilantro",
      "Onion 1"
    ],
    "steps": [
      "Blend the soaked chilies with garlic and spices into a marinade.",
      "Coat the pork and marinate for at least two hours.",
      "Sear the pork in a hot pan until charred and cooked through, then chop finely.",
      "Warm the tortillas and fill with pork and a spoon of pineapple.",
      "Top with onion, cilantro and lime."
    ]
  },
  {
    "id": "feijoada",
    "country": "Brazil",
    "name": "Feijoada",
    "region": "Latin American",
    "tag": "Rich, smoky, slow-cooked",
    "time": "3 hr",
    "level": "Medium",
    "tint": "#E6D5C8",
    "flag": "radial-gradient(circle,#002776 0 22%,#FFDF00 23% 52%,transparent 53%),#009C3B",
    "ing": [
      "Black beans 500g",
      "Smoked sausage 300g",
      "Pork shoulder 500g",
      "Bay leaves 2",
      "Garlic 4 cloves",
      "Onion 1",
      "Oranges 2",
      "White rice"
    ],
    "steps": [
      "Soak the black beans overnight.",
      "Simmer the beans with the pork and sausage until tender, at least two hours.",
      "Sauté onion and garlic, then stir into the pot with bay leaves.",
      "Continue simmering until the sauce thickens.",
      "Serve over rice with orange slices on the side."
    ]
  },
  {
    "id": "empanadas",
    "country": "Argentina",
    "name": "Beef Empanadas",
    "region": "Latin American",
    "tag": "Baked pastry, savory filling",
    "time": "60 min",
    "level": "Medium",
    "tint": "#EAD8B0",
    "flag": "linear-gradient(#75AADB 0 33%,#fff 33% 67%,#75AADB 67%)",
    "ing": [
      "Empanada dough discs 16",
      "Ground beef 500g",
      "Onion 1",
      "Hard-boiled eggs 2",
      "Cumin 1 tsp",
      "Green olives 1/2 cup"
    ],
    "steps": [
      "Cook the beef and onion with cumin until browned and fragrant.",
      "Cool the filling, then stir in chopped egg and olives.",
      "Fill each dough disc, fold and crimp the edges.",
      "Brush with egg wash.",
      "Bake until golden and crisp."
    ]
  },
  {
    "id": "kebab",
    "country": "Turkey",
    "name": "Turkish Kebab",
    "region": "Middle Eastern",
    "tag": "Grilled, herby, juicy",
    "time": "40 min",
    "level": "Easy",
    "tint": "#F2D3C8",
    "flag": "radial-gradient(circle at 56% 50%,#E30A17 0 24%,transparent 25%),radial-gradient(circle at 46% 50%,#fff 0 30%,transparent 31%),#E30A17",
    "ing": [
      "Ground lamb 500g",
      "Onion 1",
      "Flatbread",
      "Tomatoes 2",
      "Sumac 1 tsp",
      "Flat-leaf parsley",
      "Green peppers 2"
    ],
    "steps": [
      "Grate the onion and squeeze out the excess liquid.",
      "Mix with the lamb, sumac and seasoning, and knead until sticky.",
      "Shape onto skewers.",
      "Grill, turning occasionally, until charred outside and cooked through.",
      "Serve on flatbread with grilled tomatoes and peppers."
    ]
  },
  {
    "id": "falafel",
    "country": "Lebanon",
    "name": "Falafel",
    "region": "Middle Eastern",
    "tag": "Crisp, herby, plant-based",
    "time": "40 min",
    "level": "Easy",
    "tint": "#E8EFC8",
    "flag": "radial-gradient(circle,#00A651 0 16%,transparent 17%),linear-gradient(#ED1C24 25%,#fff 25% 75%,#ED1C24 75%)",
    "ing": [
      "Dried chickpeas 2 cups, soaked overnight",
      "Flat-leaf parsley 1 bunch",
      "Cilantro 1 bunch",
      "Garlic 4 cloves",
      "Cumin 2 tsp",
      "Tahini, pita, lime"
    ],
    "steps": [
      "Drain the soaked chickpeas well, do not cook them.",
      "Blend with herbs, garlic and spices to a coarse, sticky paste.",
      "Rest the mixture briefly, then shape into balls or patties.",
      "Fry until deep golden and crisp outside.",
      "Serve in pita with tahini sauce."
    ]
  },
  {
    "id": "hummus",
    "country": "Israel",
    "name": "Hummus with Warm Pita",
    "region": "Middle Eastern",
    "tag": "Creamy, garlicky, simple",
    "time": "20 min",
    "level": "Easy",
    "tint": "#EAE0B8",
    "flag": "linear-gradient(#fff 0 100%)",
    "ing": [
      "Cooked chickpeas 2 cups",
      "Tahini 1/3 cup",
      "Lemon 1",
      "Garlic 2 cloves",
      "Olive oil",
      "Cumin 1/2 tsp"
    ],
    "steps": [
      "Blend the chickpeas with tahini, lemon juice and garlic.",
      "Add ice water gradually while blending until light and fluffy.",
      "Season with cumin and salt to taste.",
      "Spread onto a plate and swirl with olive oil.",
      "Serve with warm pita."
    ]
  },
  {
    "id": "biryani",
    "country": "Iran",
    "name": "Saffron Rice with Lamb",
    "region": "Middle Eastern",
    "tag": "Fragrant, jewelled, festive",
    "time": "75 min",
    "level": "Medium",
    "tint": "#EAD8A0",
    "flag": "linear-gradient(#239F40 0 33%,#fff 33% 67%,#DA0000 67%)",
    "ing": [
      "Basmati rice 2 cups",
      "Lamb shoulder 600g",
      "Saffron pinch",
      "Barberries 1/2 cup",
      "Pistachios 1/3 cup",
      "Onion 1"
    ],
    "steps": [
      "Braise the lamb with onion and spices until tender.",
      "Parboil the rice, then layer with the lamb in a pot.",
      "Steam gently until the rice is fully cooked and a crust forms at the base.",
      "Toast the barberries and pistachios briefly in butter.",
      "Serve the rice topped with the lamb and jewelled garnish."
    ]
  },
  {
    "id": "pavlova",
    "country": "Australia",
    "name": "Pavlova",
    "region": "Oceania",
    "tag": "Crisp meringue, soft center",
    "time": "2 hr",
    "level": "Medium",
    "tint": "#F4EAD9",
    "flag": "linear-gradient(#00008B 0 100%)",
    "ing": [
      "Egg whites 6",
      "Caster sugar 1.5 cups",
      "Cornstarch 1 tbsp",
      "White vinegar 1 tsp",
      "Whipped cream, berries"
    ],
    "steps": [
      "Whisk the egg whites to soft peaks, then add sugar gradually until stiff and glossy.",
      "Fold in cornstarch and vinegar.",
      "Shape onto a lined tray and bake low and slow until crisp outside.",
      "Cool completely in the oven with the door ajar.",
      "Top with whipped cream and berries just before serving."
    ]
  },
  {
    "id": "hangi",
    "country": "New Zealand",
    "name": "Hangi-Style Lamb & Kumara",
    "region": "Oceania",
    "tag": "Smoky, earthy, slow-cooked",
    "time": "3 hr",
    "level": "Medium",
    "tint": "#E2CFA6",
    "flag": "linear-gradient(#00247D 0 100%)",
    "ing": [
      "Lamb shoulder 1kg",
      "Kumara (sweet potato) 4",
      "Cabbage 1/2 head",
      "Carrots 3",
      "Chicken stock"
    ],
    "steps": [
      "Season the lamb well and place in a heavy oven-proof pot.",
      "Layer the kumara, carrots and cabbage around it.",
      "Add a little stock, cover tightly to trap the steam.",
      "Cook low and slow until the lamb is falling-apart tender.",
      "Rest briefly, then serve everything together."
    ]
  },
  {
    "id": "kokoda",
    "country": "Fiji",
    "name": "Kokoda",
    "region": "Oceania",
    "tag": "Citrus-cured fish, coconut, fresh",
    "time": "30 min",
    "level": "Easy",
    "tint": "#DCEAE6",
    "flag": "linear-gradient(#002868 0 100%)",
    "ing": [
      "White fish fillets 500g",
      "Lime juice 1 cup",
      "Coconut milk 1 cup",
      "Red onion 1",
      "Tomato 1",
      "Chili 1",
      "Cilantro"
    ],
    "steps": [
      "Dice the fish and cover in lime juice; refrigerate until it turns opaque, about 20 minutes.",
      "Drain most of the lime juice, keeping the fish.",
      "Stir in coconut milk, diced onion, tomato and chili.",
      "Season with salt and finish with cilantro.",
      "Serve well chilled, in half a coconut shell if you have one."
    ]
  },
  {
    "id": "koshari",
    "country": "Egypt",
    "name": "Koshari",
    "region": "African",
    "tag": "Layered carbs, tangy tomato sauce",
    "time": "50 min",
    "level": "Medium",
    "tint": "#E8D9B5",
    "flag": "linear-gradient(#CE1126 0 33%,#fff 33% 67%,#000 67%)",
    "ing": [
      "Rice 1.5 cups",
      "Brown lentils 1 cup",
      "Small macaroni 1 cup",
      "Crispy fried onions 1 cup",
      "Tomato sauce 2 cups",
      "Garlic 4 cloves",
      "Cumin 1 tsp",
      "White vinegar"
    ],
    "steps": [
      "Cook the rice, lentils and macaroni separately until tender.",
      "Simmer the tomato sauce with garlic, cumin and a splash of vinegar until rich.",
      "Layer rice, lentils and macaroni in a bowl.",
      "Spoon the tomato sauce generously over the top.",
      "Finish with a heavy scattering of crispy fried onions."
    ]
  },
  {
    "id": "tunisiancouscous",
    "country": "Tunisia",
    "name": "Tunisian Couscous with Lamb",
    "region": "African",
    "tag": "Spiced, hearty, one-pot",
    "time": "90 min",
    "level": "Medium",
    "tint": "#E7C98A",
    "flag": "linear-gradient(#E70013 0 100%)",
    "ing": [
      "Couscous 2 cups",
      "Lamb shoulder 600g",
      "Carrots 3",
      "Chickpeas 1 cup",
      "Harissa 2 tbsp",
      "Tomato paste 2 tbsp",
      "Onion 1"
    ],
    "steps": [
      "Brown the lamb with onion, then stir in tomato paste and harissa.",
      "Add water to cover, the carrots and chickpeas, and simmer until the lamb is tender.",
      "Steam the couscous, fluffing with a fork and a little oil between steamings.",
      "Mound the couscous on a platter.",
      "Top with the lamb, vegetables and a ladle of the spiced broth."
    ]
  },
  {
    "id": "sadza",
    "country": "Zimbabwe",
    "name": "Sadza with Beef Stew",
    "region": "African",
    "tag": "Cornmeal staple, rich stew",
    "time": "60 min",
    "level": "Easy",
    "tint": "#E9E2CE",
    "flag": "linear-gradient(#006400 0 20%,#FFD200 20% 30%,#D40000 30% 40%,#000 40% 50%,#fff 50% 60%,#006400 60%)",
    "ing": [
      "White cornmeal 2 cups",
      "Water 4 cups",
      "Beef chuck 500g",
      "Onion 1",
      "Tomatoes 2",
      "Garlic 2 cloves",
      "Leafy greens 1 bunch"
    ],
    "steps": [
      "Brown the beef with onion and garlic, then simmer with tomatoes until tender.",
      "Bring water to a boil, whisk in a little cornmeal to form a loose porridge.",
      "Gradually beat in the remaining cornmeal until it pulls into a stiff, smooth dough.",
      "Wilt the greens briefly and season.",
      "Serve the sadza alongside the stew and greens."
    ]
  },
  {
    "id": "groundnutsoup",
    "country": "Sierra Leone",
    "name": "Groundnut Soup",
    "region": "African",
    "tag": "Peanut stew, rich, warming",
    "time": "55 min",
    "level": "Easy",
    "tint": "#E2C79A",
    "flag": "linear-gradient(#1EB53A 0 33%,#fff 33% 67%,#0072C6 67%)",
    "ing": [
      "Peanut butter 1 cup",
      "Chicken thighs 600g",
      "Tomatoes 3",
      "Onion 1",
      "Scotch bonnet pepper 1",
      "Ginger 1 tbsp",
      "Stock 3 cups"
    ],
    "steps": [
      "Brown the chicken, then set aside.",
      "Blend the tomatoes, onion, pepper and ginger into a smooth base.",
      "Fry the base until thick, then stir in the peanut butter and stock.",
      "Return the chicken and simmer until cooked through and the sauce is thick.",
      "Serve hot over rice."
    ]
  },
  {
    "id": "kungpao",
    "country": "China",
    "name": "Kung Pao Chicken",
    "region": "Asian",
    "tag": "Spicy, nutty, stir-fried",
    "time": "30 min",
    "level": "Easy",
    "tint": "#E9CBAE",
    "flag": "linear-gradient(#DE2910 0 100%)",
    "ing": [
      "Chicken thighs 500g",
      "Roasted peanuts 1/2 cup",
      "Dried chilies 6",
      "Garlic 3 cloves",
      "Ginger 1 tbsp",
      "Soy sauce 3 tbsp",
      "Rice vinegar 2 tbsp",
      "Scallions 3"
    ],
    "steps": [
      "Marinate the diced chicken briefly in a little soy sauce.",
      "Stir-fry the dried chilies, garlic and ginger in a hot wok until fragrant.",
      "Add the chicken and stir-fry until just cooked.",
      "Stir in the sauce mixture and peanuts, tossing to coat.",
      "Finish with scallions and serve immediately."
    ]
  },
  {
    "id": "ramen",
    "country": "Japan",
    "name": "Shoyu Ramen",
    "region": "Asian",
    "tag": "Savory broth, springy noodles",
    "time": "45 min",
    "level": "Medium",
    "tint": "#E6D7BC",
    "flag": "radial-gradient(circle,#BC002D 0 28%,#fff 29%)",
    "ing": [
      "Ramen noodles 4 portions",
      "Chicken or pork stock 6 cups",
      "Soy sauce 4 tbsp",
      "Mirin 2 tbsp",
      "Soft-boiled eggs 4",
      "Scallions",
      "Nori sheets"
    ],
    "steps": [
      "Simmer the stock with soy sauce and mirin until well seasoned.",
      "Cook the noodles separately until just tender, then drain.",
      "Divide the noodles among bowls and ladle over the hot broth.",
      "Top each bowl with a halved soft-boiled egg and scallions.",
      "Add a sheet of nori and serve immediately."
    ]
  },
  {
    "id": "adobo",
    "country": "Philippines",
    "name": "Chicken Adobo",
    "region": "Asian",
    "tag": "Tangy, savory, braised",
    "time": "45 min",
    "level": "Easy",
    "tint": "#E7D6B8",
    "flag": "linear-gradient(#0038A8 0 50%,#CE1126 50%)",
    "ing": [
      "Chicken thighs 1kg",
      "Soy sauce 1/2 cup",
      "White vinegar 1/3 cup",
      "Garlic 6 cloves",
      "Bay leaves 2",
      "Black peppercorns 1 tsp"
    ],
    "steps": [
      "Combine the chicken, soy sauce, vinegar, garlic, bay leaves and peppercorns in a pot.",
      "Bring to a simmer uncovered, without stirring, for several minutes.",
      "Cover and simmer until the chicken is tender.",
      "Uncover and reduce the sauce until it thickens slightly.",
      "Serve over rice with the sauce spooned over."
    ]
  },
  {
    "id": "karahi",
    "country": "Pakistan",
    "name": "Chicken Karahi",
    "region": "Asian",
    "tag": "Tomato-rich, gingery, bold",
    "time": "40 min",
    "level": "Easy",
    "tint": "#E9C9A8",
    "flag": "linear-gradient(#01411C 0 30%,#fff 30%)",
    "ing": [
      "Chicken thighs 1kg",
      "Tomatoes 4",
      "Ginger 2 tbsp",
      "Garlic 1 tbsp",
      "Green chilies 3",
      "Coriander seeds 1 tsp",
      "Yogurt 1/4 cup"
    ],
    "steps": [
      "Fry the chicken in hot oil until browned on all sides.",
      "Add ginger, garlic and coriander seeds, and cook until fragrant.",
      "Stir in the chopped tomatoes and simmer until they break down into a thick sauce.",
      "Add chilies and a spoon of yogurt, and simmer until the chicken is cooked through.",
      "Finish with julienned ginger and fresh coriander."
    ]
  },
  {
    "id": "bhuna",
    "country": "Bangladesh",
    "name": "Chicken Bhuna",
    "region": "Asian",
    "tag": "Thick, dark, deeply spiced",
    "time": "50 min",
    "level": "Medium",
    "tint": "#E2BE94",
    "flag": "linear-gradient(#006A4E 0 100%)",
    "ing": [
      "Chicken thighs 1kg",
      "Onions 3",
      "Garlic 1 tbsp",
      "Ginger 1 tbsp",
      "Turmeric 1 tsp",
      "Chili powder 1 tsp",
      "Mustard oil 3 tbsp"
    ],
    "steps": [
      "Fry the sliced onions in mustard oil until deep golden.",
      "Add garlic, ginger and spices, and fry until fragrant.",
      "Add the chicken and cook uncovered, stirring often, until the liquid evaporates and the sauce clings to the meat.",
      "Continue frying until the oil separates at the edges.",
      "Serve with rice or flatbread."
    ]
  },
  {
    "id": "srilankancurry",
    "country": "Sri Lanka",
    "name": "Sri Lankan Chicken Curry",
    "region": "Asian",
    "tag": "Coconut, curry leaves, roasted spice",
    "time": "45 min",
    "level": "Medium",
    "tint": "#E7C99E",
    "flag": "linear-gradient(#FFBE29 0 20%,#00534E 20% 40%,#8D153A 40% 60%,#EB7400 60% 80%,#FFBE29 80%)",
    "ing": [
      "Chicken thighs 1kg",
      "Coconut milk 1.5 cups",
      "Roasted curry powder 2 tbsp",
      "Curry leaves 1 sprig",
      "Onion 1",
      "Garlic 4 cloves",
      "Cinnamon stick 1"
    ],
    "steps": [
      "Fry the onion, garlic, cinnamon and curry leaves until fragrant.",
      "Add the chicken and curry powder, and cook until coated and lightly browned.",
      "Pour in the coconut milk and simmer until the chicken is tender and the sauce thickens.",
      "Adjust seasoning with salt.",
      "Serve with rice."
    ]
  },
  {
    "id": "pierogi",
    "country": "Poland",
    "name": "Pierogi",
    "region": "European",
    "tag": "Filled dumplings, buttery",
    "time": "75 min",
    "level": "Medium",
    "tint": "#EAE2CE",
    "flag": "linear-gradient(#fff 0 50%,#DC143C 50%)",
    "ing": [
      "Flour 3 cups",
      "Potatoes 4, boiled",
      "Farmer's cheese 1 cup",
      "Onion 1",
      "Butter",
      "Sour cream"
    ],
    "steps": [
      "Make a simple dough from flour, water and a pinch of salt; rest it.",
      "Mash the potatoes with cheese and most of a fried onion for the filling.",
      "Roll the dough thin and cut rounds; fill and pinch each one closed.",
      "Boil the pierogi until they float, then drain.",
      "Pan-fry briefly in butter with the remaining onion, and serve with sour cream."
    ]
  },
  {
    "id": "stroganoff",
    "country": "Russia",
    "name": "Beef Stroganoff",
    "region": "European",
    "tag": "Creamy, tangy, comforting",
    "time": "35 min",
    "level": "Easy",
    "tint": "#E3D6CC",
    "flag": "linear-gradient(#fff 0 33%,#0039A6 33% 67%,#D52B1E 67%)",
    "ing": [
      "Beef sirloin 600g, sliced thin",
      "Mushrooms 300g",
      "Onion 1",
      "Sour cream 1 cup",
      "Dijon mustard 1 tbsp",
      "Beef stock 1/2 cup"
    ],
    "steps": [
      "Sear the beef strips quickly over high heat, then set aside.",
      "Sauté the onion and mushrooms in the same pan until golden.",
      "Add stock and mustard, and simmer briefly.",
      "Stir in the sour cream off the heat, then return the beef.",
      "Serve over egg noodles or rice."
    ]
  },
  {
    "id": "lomosaltado",
    "country": "Peru",
    "name": "Lomo Saltado",
    "region": "Latin American",
    "tag": "Stir-fried beef, fries, soy-sharp",
    "time": "30 min",
    "level": "Easy",
    "tint": "#E7D2B0",
    "flag": "linear-gradient(90deg,#D91023 0 33%,#fff 33% 67%,#D91023 67%)",
    "ing": [
      "Beef sirloin 500g, sliced",
      "French fries, cooked",
      "Red onion 1",
      "Tomatoes 2",
      "Soy sauce 3 tbsp",
      "Red wine vinegar 1 tbsp",
      "Cilantro"
    ],
    "steps": [
      "Sear the beef in a very hot pan until browned, then set aside.",
      "Stir-fry the onion and tomatoes briefly, keeping them a little crisp.",
      "Return the beef, add soy sauce and vinegar, and toss over high heat.",
      "Fold in the fries right at the end so they stay crisp.",
      "Finish with cilantro and serve with rice."
    ]
  },
  {
    "id": "cazuela",
    "country": "Chile",
    "name": "Cazuela",
    "region": "Latin American",
    "tag": "Chicken and vegetable stew, homey",
    "time": "70 min",
    "level": "Easy",
    "tint": "#E6D9BE",
    "flag": "linear-gradient(#fff 0 50%,#D52B1E 50%)",
    "ing": [
      "Chicken thighs 1kg",
      "Pumpkin 300g",
      "Potatoes 2",
      "Corn on the cob 2",
      "Rice 1/2 cup",
      "Onion 1",
      "Carrots 2"
    ],
    "steps": [
      "Simmer the chicken with onion in water to cover until nearly tender.",
      "Add the pumpkin, potatoes, carrots and corn, and continue simmering.",
      "Stir in the rice and cook until everything is tender.",
      "Season with salt and a little oregano.",
      "Serve in deep bowls with the broth."
    ]
  },
  {
    "id": "jerkchicken",
    "country": "Jamaica",
    "name": "Jerk Chicken",
    "region": "Latin American",
    "tag": "Smoky, spicy, deeply marinated",
    "time": "50 min",
    "level": "Medium",
    "tint": "#E5C39E",
    "flag": "linear-gradient(#009B3A 0 33%,#FED100 33% 67%,#000 67%)",
    "ing": [
      "Chicken thighs and drumsticks 1.2kg",
      "Scotch bonnet peppers 2",
      "Scallions 4",
      "Allspice 2 tbsp",
      "Thyme",
      "Garlic 4 cloves",
      "Lime 1"
    ],
    "steps": [
      "Blend the peppers, scallions, allspice, thyme, garlic and lime juice into a marinade.",
      "Coat the chicken well and marinate at least a few hours, ideally overnight.",
      "Grill over medium heat, turning often, until charred and cooked through.",
      "Baste occasionally with leftover marinade early in cooking.",
      "Rest briefly before serving."
    ]
  },
  {
    "id": "ropavieja",
    "country": "Cuba",
    "name": "Ropa Vieja",
    "region": "Latin American",
    "tag": "Shredded beef, peppers, tomato",
    "time": "2.5 hr",
    "level": "Medium",
    "tint": "#E6CFB8",
    "flag": "linear-gradient(#002A8F 0 20%,#fff 20% 40%,#002A8F 40% 60%,#fff 60% 80%,#002A8F 80%)",
    "ing": [
      "Flank steak 800g",
      "Bell peppers 2",
      "Onion 1",
      "Tomato sauce 1.5 cups",
      "Garlic 4 cloves",
      "Cumin 1 tsp",
      "Bay leaves 2"
    ],
    "steps": [
      "Simmer the flank steak in water with bay leaves until very tender, then shred it, reserving the broth.",
      "Sauté onion, peppers and garlic until soft.",
      "Stir in tomato sauce, cumin and a splash of the reserved broth.",
      "Add the shredded beef and simmer until the sauce thickens around it.",
      "Serve with rice and black beans."
    ]
  },
  {
    "id": "kabsa",
    "country": "Saudi Arabia",
    "name": "Chicken Kabsa",
    "region": "Middle Eastern",
    "tag": "Spiced rice, whole chicken, festive",
    "time": "80 min",
    "level": "Medium",
    "tint": "#E8D4A6",
    "flag": "linear-gradient(#006C35 0 100%)",
    "ing": [
      "Basmati rice 2 cups",
      "Chicken quarters 1kg",
      "Tomatoes 2",
      "Onion 1",
      "Kabsa spice mix 2 tbsp",
      "Garlic 4 cloves",
      "Raisins and almonds for garnish"
    ],
    "steps": [
      "Brown the chicken pieces, then set aside.",
      "Fry the onion and garlic, add tomatoes and kabsa spices, and cook into a thick base.",
      "Return the chicken, add water to cover and simmer until tender.",
      "Remove the chicken, stir the rice into the remaining liquid and cook until done.",
      "Serve the rice topped with the chicken and a scatter of raisins and almonds."
    ]
  },
  {
    "id": "mansaf",
    "country": "Jordan",
    "name": "Chicken Mansaf",
    "region": "Middle Eastern",
    "tag": "Yogurt sauce, rice, festive",
    "time": "70 min",
    "level": "Medium",
    "tint": "#E9E0C8",
    "flag": "linear-gradient(#000 0 33%,#fff 33% 67%,#007A3D 67%)",
    "ing": [
      "Chicken pieces 1kg",
      "Dried yogurt (jameed) or plain yogurt 3 cups",
      "Rice 2 cups",
      "Flatbread",
      "Almonds and pine nuts, toasted",
      "Cardamom pods"
    ],
    "steps": [
      "Simmer the chicken in water with cardamom until tender; reserve the broth.",
      "Whisk the yogurt with a little broth and warm gently, stirring constantly so it doesn't split.",
      "Cook the rice in the remaining broth.",
      "Spread flatbread on a platter, top with rice, then the chicken.",
      "Pour the warm yogurt sauce over, and scatter with toasted nuts."
    ]
  },
  {
    "id": "dolma",
    "country": "Iraq",
    "name": "Dolma",
    "region": "Middle Eastern",
    "tag": "Stuffed vegetables, rice, tangy",
    "time": "90 min",
    "level": "Medium",
    "tint": "#D9E3C4",
    "flag": "linear-gradient(#CE1126 0 33%,#fff 33% 67%,#000 67%)",
    "ing": [
      "Grape leaves or small vegetables (peppers, zucchini) 20",
      "Rice 1.5 cups",
      "Ground beef 300g",
      "Tomato 1",
      "Mint and parsley",
      "Lemon juice 1/4 cup"
    ],
    "steps": [
      "Mix the rice with ground beef, chopped tomato and herbs for the filling.",
      "Hollow the vegetables, or lay out grape leaves, and fill with the rice mixture.",
      "Roll or close each one snugly and pack into a pot.",
      "Add water and lemon juice to cover, weigh down with a plate, and simmer until the rice is cooked.",
      "Serve warm or at room temperature."
    ]
  }
];

module.exports = { DISHES };
