import { Art } from "@/components/ui/Art";
import { Eyebrow } from "@/components/ui/Eyebrow";

const outcomes=[
  {g:'g1',k:'Thu nhập',t:'20',suffix:'–100',small:'triệu/tháng',p:'Mức thu nhập mục tiêu học viên hướng tới từ kỹ năng Social Media.'},
  {g:'g2',k:'Cộng đồng',t:'500',suffix:'+',p:'Học viên đã tin tưởng và áp dụng vào công việc của mình.'},
  {g:'g3',k:'Thư viện',t:'30',suffix:'+',p:'Tài liệu, templates và sản phẩm số dùng được ngay.'},
  {g:'g4',k:'Chất lượng',t:'100',suffix:'%',p:'Kiến thức thực chiến, cập nhật liên tục theo thị trường.'},
];
export function Outcome(){return <section className="outcome sec"><div className="wrap"><Eyebrow data-rv="up">Outcome</Eyebrow><h2 className="h1 oc-head" data-rv="clip" data-dl="70" style={{marginTop:18}}>Nếu bạn đang <span className="cap lil">mắc kẹt</span> giữa việc học và việc làm thật —</h2><p className="lead oc-lead" data-rv="up" data-dl="150">…thì đây là chỗ để bạn rút ngắn khoảng cách đó. Không phải lý thuyết, mà là những gì mình đã dùng để đi làm, nhận dự án và sống được bằng nghề này.</p><div className="oc-grid">{outcomes.map((o,i)=><div className="oc" key={o.k} data-rv="up" data-dl={i*90}><div className="oc-vis"><Art variant={o.g}/><span className="kicker glass">{o.k}</span></div><div className="oc-body"><b><span className="num" data-t={o.t}>0</span>{o.suffix} {o.small?<small>{o.small}</small>:null}</b><p>{o.p}</p></div></div>)}</div></div></section>}
