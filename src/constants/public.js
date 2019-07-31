const ParkingBoyStatus = {
  0: { text: '冻结', color: '#737987' },
  1: { text: '空闲', color: '#9efc17' },
  2: { text: '忙碌', color: '#ed4014' }
}

const SearchByParkingBoyStatus = [
  { value: 0, label: '冻结', color: '#737987' },
  { value: 1, label: '空闲', color: '#9efc17' },
  { value: 2, label: '忙碌', color: '#ed4014' }
]

const ParkingLotStatus = {
  0: '已冻结',
  1: '正常'
}

export default {
  ParkingBoyStatus,
  ParkingLotStatus,
  SearchByParkingBoyStatus
}
