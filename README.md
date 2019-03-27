# spider-book
## 目录结构  
## api结构  
### 作者著作列表
```
{
	// 作者id
	authorid： authorid,
	// 作者名
	author: author,
	// 作品列表
	bookList: [
		{
			// 书籍id
			'bookid': book,
			// 书籍名
			'bookimg': bookBg
		},
		{
			'bookid': book,
			'bookimg': bookBg
		},
		{
			'bookid': book,
			'bookimg': bookBg
		}
	]
}
```
### 书籍目录列表
```
{
	// 作者名
	author: author,
	// 书籍id
	bookid: book,
	sectionList: [
		{
			// 章节id
			sectionid: sectionid,
			// 章节名
			sectionname: sectionname
		},
		{
			// 章节id
			sectionid: sectionid,
			// 章节名
			sectionname: sectionname
		},
		{
			// 章节id
			sectionid: sectionid,
			// 章节名
			sectionname: sectionname
		}
	]
}
```