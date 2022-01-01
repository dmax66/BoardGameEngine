class Table3D
{
  constructor ()
  {
    this.data = new Map ();
  }
  
  
  set (x, y, z, value)
  {
    let row = this.data.get (x);
    if (row == undefined)
    {
      // Row does not exist
      row = new Map ();
      this.data.set (x, row);
    }      
      
    let col = row.get (y);
    if (col == undefined)
    {
      // Column does not exist
      col = new Map ();
      row.set (y, col);
    }
      
    col.set (z, value);
  
  get (x, y, z)
  {
    const row = this.data.get (x);
    if (row == undefined)
    {
      return underfined;
    }

    const col = row.get (y);
    if (col == undefined)
    {
      return undefined;
    }
      
    return col.get (z);
  }

} // Class