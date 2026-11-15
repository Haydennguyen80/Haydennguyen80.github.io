"""Ghi mã bản (BUILD) vào poppy/index.html và poppy/version.json để game tự cập nhật.
Chạy trước mỗi lần git commit:  py tools/build-id.py
Mã bản = 10 ký tự đầu của sha1 nội dung index.html (bỏ dòng BUILD), nên mã đổi khi và chỉ khi game đổi."""
import hashlib, json, pathlib, re, datetime

root = pathlib.Path(__file__).resolve().parent.parent / "poppy"
html = root / "index.html"
s = html.read_text(encoding="utf-8")
pat = re.compile(r'const BUILD = "[^"]*";')
assert len(pat.findall(s)) == 1, "không thấy đúng một dòng BUILD"
bid = hashlib.sha1(pat.sub('const BUILD = "";', s).encode("utf-8")).hexdigest()[:10]
s2 = pat.sub(f'const BUILD = "{bid}";', s)
if s2 != s:
    html.write_text(s2, encoding="utf-8", newline="")
(root / "version.json").write_text(json.dumps({"build": bid, "time": datetime.datetime.now().isoformat(timespec="minutes")}) + "\n", encoding="utf-8")
print("BUILD", bid)
