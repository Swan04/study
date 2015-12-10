/**
 * @author qy
 */
function State(){
	throw new Error("这是静态类，不能被实例化");
}
State.First = 0;
State.Second = 1;
State.Third = 2;

switch(State.First){
	case State.First:
	      document.write("0");
	      break;
	case State.Second:
	      document.write("1");
	      break;
	case State.Third:
	      document.write("2");
	      break;
}
