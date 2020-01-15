## ------------------------------------------------------------------------
library(scales)
library(ggplot2)
library(reshape)
library(RMySQL)

## ------------------------------------------------------------------------
con <- dbConnect(MySQL(), user="user", password="password",dbname="dbname",host="host")

## ------------------------------------------------------------------------
hai.data.SDY212 <- dbGetQuery(con,"SELECT hr.subject_accession, hr.arm_accession, hr.study_time_collected, hr.study_time_collected_unit, hr.value_preferred, hr.virus_strain_reported, s.race, s.gender, a2s.min_subject_age, a2s.age_unit
    FROM hai_result hr, subject s, arm_2_subject a2s
                WHERE hr.study_accession = 'SDY212'
                AND hr.subject_accession = s.subject_accession
    AND a2s.subject_accession = s.subject_accession;")
hai.data.SDY212 <- cbind(hai.data.SDY212,ARM_NAME=NA)
hai.data.SDY212[which(hai.data.SDY212$arm_accession == "ARM894"),"ARM_NAME"] <- "Young"
hai.data.SDY212[which(hai.data.SDY212$arm_accession == "ARM895"),"ARM_NAME"] <- "Old"

## ------------------------------------------------------------------------
unique(hai.data.SDY212[,"age_unit"])

## ------------------------------------------------------------------------
hai.SDY212.prepost <- cast(hai.data.SDY212, subject_accession + min_subject_age + gender + race + virus_strain_reported + arm_accession + ARM_NAME ~ study_time_collected, value='value_preferred')
colnames(hai.SDY212.prepost)[colnames(hai.SDY212.prepost)%in%c("0","28")] <- c("Day0","Day28")
hai.results.SDY212 <- cbind(hai.SDY212.prepost, fold.change= hai.SDY212.prepost[,"Day28"] / hai.SDY212.prepost[,"Day0"])

## ------------------------------------------------------------------------
colnames(hai.results.SDY212) <- sapply(colnames(hai.results.SDY212),function(x){
  if(x %in% c('Day0', 'Day28', 'fold.change')){
    return(x)
  }else{
    return(toupper(x))
  }})

## ------------------------------------------------------------------------
subjects.HAI <- unique(hai.results.SDY212[,c("SUBJECT_ACCESSION", "MIN_SUBJECT_AGE", "GENDER", "RACE","ARM_NAME")])

## ------------------------------------------------------------------------
table(subjects.HAI$ARM_NAME)
table(subjects.HAI$GENDER)
table(subjects.HAI$RACE)

## ----fig.width=7, fig.height=5-------------------------------------------
ggplot(data=subjects.HAI, aes(x=ARM_NAME,fill=GENDER)) + geom_bar(stat="count", position=position_dodge(), colour="black")
ggplot(data=subjects.HAI, aes(x=ARM_NAME,fill=RACE)) + geom_bar(stat="count", position=position_dodge(), colour="black")
ggplot(data=subjects.HAI, aes(x=GENDER,y=MIN_SUBJECT_AGE)) + geom_boxplot() + geom_point(aes(color=RACE),position=position_jitter(width=0.25,height=.1)) + theme(axis.text.x=element_text(angle=50, vjust=1.2,hjust=1.2)) + facet_wrap(~ ARM_NAME,ncol=2)

## ----fig.width=6.8, fig.height=5-----------------------------------------
ggplot(hai.results.SDY212, aes(x=Day0, y=Day28, color=VIRUS_STRAIN_REPORTED)) + 
    	scale_y_continuous(trans=log2_trans()) + scale_x_continuous(trans=log2_trans()) +
			geom_point(position=position_jitter(width=0.1,height=.1)) +
			ylab("HAI titer post vaccination") + xlab("HAI titer pre vaccination")

## ----fig.width=6.8, fig.height=5-----------------------------------------
ggplot(hai.results.SDY212, aes(x=Day0, y=fold.change, color=VIRUS_STRAIN_REPORTED)) + 
    	scale_y_continuous(trans=log2_trans()) + scale_x_continuous(trans=log2_trans()) +
			geom_point(position=position_jitter(width=0.1,height=.1)) +
			geom_hline(aes(yintercept=4), colour="#BB0000", linetype="dashed") +
			ylab("HAI response (post/pre)") + xlab("HAI titer pre vaccination") +
  	  annotate("text", label = "High responders", x = 900, y = 5, size = 3.5) + annotate("text", label = "Low responders", x = 900, y = 3.1, size = 3.5)

## ----fig.width=4, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=VIRUS_STRAIN_REPORTED, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=VIRUS_STRAIN_REPORTED),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)")

## ----fig.width=4, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=ARM_NAME, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=ARM_NAME),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)")

## ----fig.width=6, fig.height=4-------------------------------------------
ggplot(hai.results.SDY212, aes(x=ARM_NAME, y=fold.change)) + geom_boxplot() + xlab("") + theme(legend.position="none") + geom_point(aes(color=VIRUS_STRAIN_REPORTED),position=position_jitter(width=0.25,height=.2)) + scale_y_continuous(trans=log2_trans())+ ylab("HAI response (Post vaccination/Pre vaccination)") + facet_wrap(~ VIRUS_STRAIN_REPORTED)

## ------------------------------------------------------------------------
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="B" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],	hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="B" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H1N1" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],  hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H1N1" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])
wilcox.test(hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H3N2" & hai.results.SDY212[,"ARM_NAME"]=="Young"),"fold.change"],  hai.results.SDY212[which(hai.results.SDY212[,"VIRUS_STRAIN_REPORTED"]=="H3N2" & hai.results.SDY212[,"ARM_NAME"]=="Old"),"fold.change"])

