import React , {useEffect, useState,useRef} from 'react'

export default (pictures,value,onChange)=>{
    const [qx, setQx] = useState(false) // 全选按钮
    const first = useRef(false) // 创建一个ref来模拟compondentDidUpdate
    const [arr,setArr] = useState(()=>{
        var a = []
        pictures.map((item,[index])=>{
            if(item.id === value[index]){
                a.push(true)
            }else {
                a.push(false)
            }
            return pictures
        })
        return a
    }) // 选择框状态
    const [finallyValue,setFinallyValue] = useState(value) // 最终返回给父组件的value
    useEffect(()=>{
      if(first.current){
            //将全选和不选搞成一致
        setArr(()=>{
          arr.map((item)=>{
            item === qx
            return arr
          })
          return arr
        })

        if(arr[0]){
            setFinallyValue(()=>{
                var a = []
                pictures.map((item,index)=>{
                    a.push(item.id)
                    return pictures
                })
                return a
            })
        }



      }else {
        first.current = true
      }
    },[qx])
    useEffect(()=>{
        if(first.current){
            //将全选和不选搞成一致
          var a = 0
          var b = 0
          arr.map((item,index)=>{
              if(item){
                a++
              }else {
                b++
              }
          })
          if(a === 3){
            setQx(true)
          }else if(b === 3){
            setQx(false)
          }

          // 返回最终value
          setFinallyValue(()=>{
            var a = []
            arr.map((item,index)=>{
                if(item){
                    a.push(pictures[index].id)
                }
                return arr
            })
          })

        }else {
          first.current = true
        }
      },[arr])
      // 当最终value改变时 调用父组件传来的方法onChange
      useEffect(()=>{
        if(first.current){
            onChange(finallyValue)
        }else {
            first.current = true
        }
      },[finallyValue])
  return (
      <div>
          <input type='radio'  checked={qx} onChange={(e)=>setQx(!e.checked)} />已选中{value.length}个文件
          {
              pictures.map((item,index)=>{
                  return (
                      <div>
                        <input type='radio'  checked={arr[index]} onChange={(e)=>setArr(!arr[index])} />
                        <img src={item.url} key={item.id} />
                      </div>
                  )
              })
          }
      </div>
  )
}