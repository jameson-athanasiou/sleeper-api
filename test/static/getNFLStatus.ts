import { getNFLStatus } from '../../src/apis/nfl'

getNFLStatus().then((res) => {
  console.log(res)
})
