

// (id, parent, name, nationality, type, initiative, bonus, commandCapacity, subordinationValue, formation, x, y, direction)
leaders[0] = new Leader (1, undefined, "Napoleon", "french", "infantry-leader", 4, true, 10, 6, "line", 5, 5, 0, "NE");
leaders[1] = new Leader (2, undefined, "Drouot", "french", "infantry-leader", 3, false, 6, 3, "line", 9, 9, 0, "NE");
leaders[2] = new Leader (3, undefined, "Bessieres", "french", "cavalry-leader", 3, true, 6, 2, "line", 5, 5, 1, "NE");  


  
leaders[0].addUnit (new InfantryUnit (1, "Roguet", "french", "division", 12));

leaders[1].addUnit (new InfantryUnit (2, "Marchand", "french", "division", 8));
leaders[1].addUnit (new InfantryUnit (3, "Morand", "french", "division", 7));

leaders[0].addUnit (leaders[1]);

leaders[2].addUnit (new InfantryUnit (4, "Desmoulin", "french", "division", 8));
leaders[2].addUnit (new CavalryUnit (5, "Subervie", "french", "division", 3));
leaders[2].addUnit (new CavalryUnit (6, "Krawitz", "german", "division", 5));
 

leaders[0].drawOnMap();
leaders[2].drawOnMap();
