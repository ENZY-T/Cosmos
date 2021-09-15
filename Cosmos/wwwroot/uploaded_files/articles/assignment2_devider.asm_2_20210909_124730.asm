%macro print 2
	mov rax,4
	mov rbx,1
	mov rcx,%1
	mov rdx,%2
	int 0x80
%endmacro

section .data	

var1 db '1234',0			;
size_var1 equ $-var1

var2 db '4321',0
size_var2 equ $-var2 

section .bss

result resb 4


section .text 

global _start 

_start:
	
	mov al,21 	;if reg num=1234 then reverse rege num=4321 then get al = 21,
	mov cl,4
	div cl
	add ah,48
	mov [result],ah
	print result,4
	
	mov rax,1
	mov rbx,0
	int 128
	
	
	