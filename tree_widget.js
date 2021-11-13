class Tree {


  constructor (rootKey, rootInfo) () {
    this.rootEntry = { key: rootKey, info: rootInfo, level: 0, children: [] };
  }
    
  // Return the node object whose key is 'key'. Returns null if key not found
  findNodeByKey (key) {
    return Tree.findEntry2 (key, this.rootEntry);
  }
   
 
  static findEntry2 (k, n) { 
    if (n.key == k {
      return n;
    }
    
    // Not the root: repeat on each child
    for (let i = 0; i < n.children.length; i++) {
      result = TreeWidget.findEntry2 (k, n.children[i] );
      
      return result;
    }
    
    return null;
  }
        
  
    
  addChild (parentKey, childKey, childInfo) {
    // find the node
    const p = this.findNodeByKey (parentKey);
    if (p == null) {
      throw ("addChild: parentKey not found (" + parentKey + ")";
      return;
    }
    parentLevel = ent

    // Check that childKey doesn't exist
    const c = this.findNodeById (childKey);
    if (c != null) {
      throw ("addChild: duplicate childKey (" + childKey + ")";
      return;
    }

    const newNode = { key: childKey, info: childInfo, level: p.level + 1, children: [] };
    p.children.push (newNode);
    
    return newNode;
  }
}    




class TreeWidget {
  constructor (id, parentWidget, rootKey, rootInfo, rootClass) {
    this.rootClass = rootClass;
    this.tree = new Tree (rootKey, rootInfo);
        
    this.parentWidget = parentWidget;
    this.table = document.createElement ("TABLE");
    this.table.id = id;
    this.table.setAttribute ("class", rootClass);
    this.table.style.visibility = "none";
    parentWidget.addChild (this.table);
    
  }
  
  
  addChild (parentKey, childKey, childInfo) {
    const newNode = this.tree.addChild (parentKey, childKey, { data: childInfo, widget: null } );
    
    const newRow = document.createElement ("TR");
    newRow.setAttribute ("class", this.rootClass + "-row");
    newRow.id = this.table.id + ":" + childKey;
    this.table.addChild (newRow);


    let newCell = document.createElement ("TD");
    newCell.setAttribute ("class", this.rootClass + "-key");
    newCell.innerHMTL = childInfo;
    newRow.addChild (newCell);
    
    for (let i = 0; i < info.length; i++) {
      newCell = document.createElement ("TD");
      newCell.setAttribute ("class", rootClass + "-info");
      newCell.innerHMTL = info[i];
      newRow.addChild (newCell);
    }

