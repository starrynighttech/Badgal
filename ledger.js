
const ledger = []
module.exports = {
  add(tx){ ledger.push(tx) },
  all(){ return ledger }
}
