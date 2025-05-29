type UserT = {  
  _id:string,
  name:string,
  email:string
}

type ChatT = {
  _id:string,
  user_1:string,
  user_2:string,
  messages:Record<string,string>[]
}

export type { UserT, ChatT }