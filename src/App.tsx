import clsx from 'clsx'
import { convertor, CoordinateType, format, parse } from 'coordx'
import { useState } from 'react'

const normalizeCoordStr = (str: string) => {
  try {
    return format(parse(str))
  } catch {
    return str
  }
}

function App() {
  const [state, setState] = useState({
    source: null as CoordinateType | null,
    wgs84: '',
    gcj02: '',
    bd09: '',
  })
  const onConvert = (source: CoordinateType) => {
    if (source === 'WGS84') {
      const origin = {
        type: source,
        ...parse(state.wgs84),
      }
      setState(state => ({
        ...state,
        source,
        wgs84: state.wgs84,
        gcj02: format(convertor.wgs84ToGCJ02(origin)),
        bd09: format(convertor.wgs84ToBD09(origin)),
      }))
    } else if (source === 'GCJ02') {
      const origin = {
        type: source,
        ...parse(state.gcj02),
      }
      setState(state => ({
        ...state,
        source,
        wgs84: format(convertor.gcj02ToWGS84(origin)),
        gcj02: state.gcj02,
        bd09: format(convertor.gcj02ToBD09(origin)),
      }))
    } else if (source === 'BD09') {
      const origin = {
        type: source,
        ...parse(state.bd09),
      }
      setState(state => ({
        ...state,
        source,
        wgs84: format(convertor.bd09ToWGS84(origin)),
        gcj02: format(convertor.bd09ToGCJ02(origin)),
        bd09: state.bd09,
      }))
    }
  }
  const buttonClass = "flex-shrink-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  const inputClass = clsx(
    "flex-shrink-0 w-64 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block",
    "dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  )
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row flex-wrap gap-2 items-baseline">
        <div className="flex-shrink-0 text-xl font-bold w-24">WGS 84</div>
        <input
          className={clsx(inputClass, state.source === 'WGS84' ? 'bg-blue-500 text-white dark:bg-blue-700' : 'bg-gray-50 dark:bg-gray-700')}
          value={state.wgs84}
          onChange={e => {
            setState(state => ({ ...state, wgs84: e.target.value }))
          }} />
        <button
          className={buttonClass}
          onClick={() => onConvert('WGS84')}>Convert</button>
        {normalizeCoordStr(state.wgs84) && <a
          className="ml-4 cursor-pointer hover:underline text-blue-400"
          href={'http://api.map.baidu.com/marker?output=html&src=webapp.baidu.openAPIdemo&coord_type=wgs84&location=' + normalizeCoordStr(state.wgs84)}
          target="_blank">
          百度地图
        </a>}
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-baseline">
        <div className="flex-shrink-0 text-xl font-bold w-24">GCJ-02</div>
        <input
          className={clsx(inputClass, state.source === 'GCJ02' ? 'bg-blue-500 text-white dark:bg-blue-700' : 'bg-gray-50 dark:bg-gray-700')}
          value={state.gcj02}
          onChange={e => {
            setState(state => ({ ...state, gcj02: e.target.value }))
          }} />
        <button
          className={buttonClass}
          onClick={() => onConvert('GCJ02')}>Convert</button>
        {normalizeCoordStr(state.gcj02) && <a
          className="ml-4 cursor-pointer hover:underline text-blue-400"
          href={'https://www.google.com/maps/place/' + normalizeCoordStr(state.gcj02)}
          target="_blank">
          Google Map
        </a>}
        {normalizeCoordStr(state.gcj02) && <a
          className="ml-4 cursor-pointer hover:underline text-blue-400"
          href={'http://api.map.baidu.com/marker?output=html&src=webapp.baidu.openAPIdemo&coord_type=gcj02&location=' + normalizeCoordStr(state.gcj02)}
          target="_blank">
          百度地图
        </a>}
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-baseline">
        <div className="flex-shrink-0 text-xl font-bold w-24">BD09</div>
        <input
          className={clsx(inputClass, state.source === 'BD09' ? 'bg-blue-500 text-white dark:bg-blue-700' : 'bg-gray-50 dark:bg-gray-700')}
          value={state.bd09}
          onChange={e => {
            setState(state => ({ ...state, bd09: e.target.value }))
          }} />
        <button
          className={buttonClass}
          onClick={() => onConvert('BD09')}>Convert</button>
        {normalizeCoordStr(state.bd09) && <a
          className="ml-4 cursor-pointer hover:underline text-blue-400"
          href={'http://api.map.baidu.com/marker?output=html&src=webapp.baidu.openAPIdemo&coord_type=bd09ll&location=' + normalizeCoordStr(state.bd09)}
          target="_blank">
          百度地图
        </a>}
      </div>
    </div>
  )
}

export default App
