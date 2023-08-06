export default function home() {
  return (
    <form className="board-size">
      <select name = 'board size' className="drop-down">
        <option selected disabled>Board size</option>
        <option value ='5'>5</option>
        <option value ='6'>6</option>
        <option value ='7'>7</option>
        <option value ='8'>8</option>
        <option value ='9'>9</option>
        <option value ='10'>10</option>
        <option value ='11'>11</option>
        <option value ='12'>12</option>
        <option value ='13'>13</option>
        <option value ='14'>14</option>
        <option value ='15'>15</option>
        <option value ='16'>16</option>
        <option value ='17'>17</option>
        <option value ='18'>18</option>
        <option value ='19'>19</option>
      </select>
      <input type = 'submit' value = 'Start' className="start"/>

    </form>
  )
}
