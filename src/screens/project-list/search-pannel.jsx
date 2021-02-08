export const SearchPannel = ({ users, param, setParam }) => {
  return <form>
    <input type='text' value={param.name} onChange={evt => setParam({
      ...param,
      name: evt.target.value
    })}></input>
    <select value={param.personId} onChange={evt => setParam({
      ...param,
      personId: evt.target.value
    })}>
      <option value={''}>负责人</option>
      {
        users.map((user, index) => <option key={index} value={user.personId}>{user.name}</option>)
      }
    </select>
  </form>
}